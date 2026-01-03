import { useContext, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Typography,
  Card,
  Chip,
  LinearProgress,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { HabitContext } from "../context/HabitContext";

const Streaks = () => {
  const { days = [], habitMaster = [] } = useContext(HabitContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  /* ================= PREPARE DATE MAP (PERFORMANCE) ================= */
  const daysMap = useMemo(() => {
    const map = {};
    days.forEach(d => {
      map[dayjs(d.date).format("YYYY-MM-DD")] = d;
    });
    return map;
  }, [days]);

  /* ================= STREAK CALCULATION ================= */
  const streaks = useMemo(() => {
    const ordered = [...days].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return habitMaster.map(habit => {
      let current = 0;
      let longest = 0;
      let temp = 0;

      for (const d of ordered) {
        if (d?.habits?.[habit.key]?.done) {
          temp++;
          longest = Math.max(longest, temp);
        } else {
          temp = 0;
        }
      }

      for (let i = ordered.length - 1; i >= 0; i--) {
        if (ordered[i]?.habits?.[habit.key]?.done) current++;
        else break;
      }

      const total = ordered.filter(
        d => d?.habits?.[habit.key]?.done
      ).length;

      return { ...habit, current, longest, total };
    });
  }, [days, habitMaster]);

  /* ================= SUMMARY ================= */
  const active = streaks.filter(s => s.current > 0).length;
  const best = Math.max(...streaks.map(s => s.longest), 0);
  const totalCompletions = streaks.reduce((sum, s) => sum + s.total, 0);

  /* ================= SELECTED DATE ================= */
  const selectedKey = selectedDate.format("YYYY-MM-DD");
  const selectedDay = daysMap[selectedKey];
  const habitsOnSelectedDay = selectedDay
    ? habitMaster.filter(h => selectedDay?.habits?.[h.key]?.done)
    : [];

  /* ================= CUSTOM CALENDAR DAY ================= */
  const CustomDay = ({ day, outsideCurrentMonth, ...other }) => {
    const dateKey = dayjs(day).format("YYYY-MM-DD");
    const dayData = daysMap[dateKey];

    const completed = habitMaster.filter(
      h => dayData?.habits?.[h.key]?.done
    ).length;

    const totalHabits = habitMaster.length || 1; // prevent divide by 0
    const percentage = completed / totalHabits;

    const isSelected = dayjs(day).isSame(selectedDate, "day");
    const hasData = completed > 0;

    let bg = "transparent";
    let text = "inherit";
    let border = "transparent";

    if (hasData && !outsideCurrentMonth) {
      if (percentage === 1) {
        bg = "#dcfce7"; text = "#166534"; border = "#86efac";
      } else if (percentage >= 0.5) {
        bg = "#fef3c7"; text = "#92400e"; border = "#fcd34d";
      } else {
        bg = "#fee2e2"; text = "#991b1b"; border = "#fca5a5";
      }
    }

    return (
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          bgcolor: isSelected ? "#3b82f6 !important" : bg,
          color: isSelected ? "#fff !important" : text,
          fontWeight: isSelected || hasData ? 700 : 400,
          border: isSelected ? "2px solid #2563eb" : `1px solid ${border}`,
          borderRadius: 2,
        }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: "100vh", px: 2, py: 4,
        background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
        
        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <LocalFireDepartmentIcon sx={{ fontSize: 40, color: "#ef4444" }} />
          <Typography variant="h4" fontWeight={800} color="#fff">
            Habit Streaks
          </Typography>
        </Box>

        {/* CALENDAR */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography fontWeight={700} mb={2}>
            <CalendarTodayIcon sx={{ mr: 1 }} />
            Habit Calendar
          </Typography>

          <DateCalendar
            value={selectedDate}
            onChange={(v) => v && setSelectedDate(v)}
            slots={{ day: CustomDay }}
          />

          <Box mt={2}>
            <Typography fontWeight={700}>
              {selectedDate.format("dddd, MMM DD")}
            </Typography>

            {habitsOnSelectedDay.length ? (
              habitsOnSelectedDay.map(h => (
                <Chip
                  key={h.key}
                  label={`${h.icon} ${h.label}`}
                  size="small"
                  sx={{ mr: 1, mt: 1 }}
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No habits completed
              </Typography>
            )}
          </Box>
        </Card>

      </Box>
    </LocalizationProvider>
  );
};

export default Streaks;
