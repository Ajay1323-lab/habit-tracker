import { useContext, useMemo, useState, useCallback } from "react";
import dayjs from "dayjs";
import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { HabitContext } from "../context/HabitContext";

const Streaks = () => {
  const { days = [], habitMaster = [] } = useContext(HabitContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const today = dayjs().startOf("day");

  /* -------------------- DATE MAP -------------------- */
  const daysMap = useMemo(() => {
    const map = {};
    days.forEach(d => {
      map[dayjs(d.date).format("YYYY-MM-DD")] = d;
    });
    return map;
  }, [days]);

  /* -------------------- STREAK BREAK CALCULATION -------------------- */
  const currentStreak = useMemo(() => {
    let streak = 0;

    for (let i = days.length - 1; i >= 0; i--) {
      const d = days[i];
      const date = dayjs(d.date).startOf("day");
      if (date.isAfter(today)) continue;

      const completed = Object.values(d.habits || {}).some(h => h?.done);
      if (!completed && date.isBefore(today)) break;

      if (completed) streak++;
    }

    return streak;
  }, [days, today]);

  /* -------------------- SELECTED DAY -------------------- */
  const selectedKey = selectedDate.format("YYYY-MM-DD");
  const selectedDay = daysMap[selectedKey];

  const habitsOnSelectedDay = selectedDay
    ? habitMaster.filter(h => selectedDay.habits?.[h.key]?.done)
    : [];

  /* -------------------- COLOR + TOOLTIP LOGIC -------------------- */
  const getDayMeta = useCallback(
    (date) => {
      const key = date.format("YYYY-MM-DD");
      const data = daysMap[key];

      const completed = data
        ? Object.values(data.habits || {}).filter(h => h?.done).length
        : 0;

      const total = habitMaster.length || 1;
      const percentage = completed / total;

      const isPast = date.isBefore(today);
      const isFuture = date.isAfter(today);

      if (isFuture) {
        return { color: "transparent", label: "Future day" };
      }

      if (percentage === 0 && isPast) {
        return { color: "#d52323ff", label: "Missing (0%)" };
      }

      if (percentage < 0.5) {
        return { color: "#ea580c", label: "Low (1–49%)" };
      }

      if (percentage < 0.8) {
        return { color: "#facc15", label: "Medium (50–79%)" };
      }

      return { color: "#16a34a", label: "High (80–100%)" };
    },
    [daysMap, habitMaster.length, today]
  );

  /* -------------------- CUSTOM DAY -------------------- */
  const CustomDay = useCallback(
    ({ day, outsideCurrentMonth, ...other }) => {
      const date = dayjs(day).startOf("day");
      const isSelected = date.isSame(selectedDate, "day");

      const { color, label } = getDayMeta(date);

      return (
        <Tooltip title={label} arrow>
          <PickersDay
            {...other}
            day={day}
            outsideCurrentMonth={outsideCurrentMonth}
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              bgcolor: isSelected ? "#4f46e5" : color,
              color: isSelected || color !== "transparent" ? "#fff" : "inherit",
              fontWeight: 600,
              borderRadius: 2,
              mx: { xs: 0.2, sm: 0.5 },
              transition: "all 0.2s ease",
            }}
          />
        </Tooltip>
      );
    },
    [getDayMeta, selectedDate]
  );

  /* -------------------- LEGEND ITEM -------------------- */
  const LegendItem = ({ color, label, Icon }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: { xs: "45%", sm: "auto" },
      }}
    >
      <Icon sx={{ fontSize: 18, color }} />
      <Typography variant="caption" fontWeight={700}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
          py: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="md">

          {/* HEADER */}
          <Box textAlign="center" mb={4}>
            <LocalFireDepartmentIcon sx={{ fontSize: 56, color: "#f97316" }} />
            <Typography variant="h5" fontWeight={900}>
              Habit Streaks
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Streak: {currentStreak} days 🔥
            </Typography>
          </Box>

          {/* LEGENDS */}
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
          >
            <LegendItem color="#16a34a" label="High (80–100%)" Icon={CheckCircleIcon} />
            <LegendItem color="#facc15" label="Medium (50–79%)" Icon={CheckCircleIcon} />
            <LegendItem color="#ea580c" label="Low (1–49%)" Icon={ErrorIcon} />
            <LegendItem color="#7f1d1d" label="Missing (0%)" Icon={ErrorIcon} />
          </Stack>

          {/* CALENDAR */}
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <DateCalendar
              value={selectedDate}
              onChange={setSelectedDate}
              slots={{ day: CustomDay }}
            />

            <Box mt={3}>
              <Typography fontWeight={800}>
                {selectedDate.format("ddd, D MMM YYYY")}
              </Typography>

              {habitsOnSelectedDay.length > 0 ? (
                <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                  {habitsOnSelectedDay.map(h => (
                    <Chip
                      key={h.key}
                      label={h.label}
                      size="small"
                      sx={{
                        bgcolor: h.color + "15",
                        color: h.color,
                        fontWeight: 700,
                      }}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  No habits completed
                </Typography>
              )}
            </Box>
          </Card>

        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Streaks;
