import { Box, Paper, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { calculateDayScore } from "../../services/habitService";

const HabitCalendar = ({ days, selectedIndex, onSelect }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const today = dayjs().startOf("day");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 1.2,
          overflowX: "auto",
          py: 1.5,
          px: 1,
          maxWidth: 900,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {days.map((day, index) => {
          const date = dayjs(day.date).startOf("day");
          const isToday = date.isSame(today);
          const isFuture = date.isAfter(today);
          const isPast = date.isBefore(today);
          const isSelected = index === selectedIndex;

          const score = calculateDayScore(day);
          const hasProgress = score > 0;

          /* 🎨 BACKGROUND (VISUAL ONLY) */
          const background = isSelected
            ? "linear-gradient(135deg, #F6E05E, #F5D042)" // Selected
            : isToday
            ? "linear-gradient(135deg, #FEF3C7, #FDE68A)" // Today
            : hasProgress
            ? "linear-gradient(135deg, #E0F7FA, #B2EBF2)" // Progress
            : isFuture
            ? isDark
              ? "rgba(255,255,255,0.06)"
              : "#E5E7EB" // Future (enabled)
            : isDark
            ? "rgba(255,255,255,0.08)"
            : "#F1F5F9";

          const textColor = isSelected
            ? "#1F2937"
            : isDark
            ? "#E5E7EB"
            : "#1F2937";

          return (
            <Paper
              key={day.date}
              elevation={isSelected ? 4 : 0}
              onClick={() => onSelect(index)} // ✅ ALLOW ALL DATES
              sx={{
                scrollSnapAlign: "center",
                minWidth: 72,
                height: 78,
                px: 1.5,
                py: 1,
                textAlign: "center",
                borderRadius: 3,
                cursor: "pointer", // ✅ always clickable
                background,
                color: textColor,
                fontWeight: 600,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "all 0.25s ease",
                boxShadow: isSelected
                  ? "0 8px 18px rgba(0,0,0,0.18)"
                  : "none",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "scale(0.97)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                {date.format("dd")}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {date.format("D")}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default HabitCalendar;
