// Progress.js
import { useContext, useState } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitCalendar from "../components/habit/HabitCalendar";
import ProgressDashboard from "../components/dashboard/ProgressDashboard";
import { Box, Typography, Container } from "@mui/material";
import dayjs from "dayjs";

const Progress = () => {
  const { days } = useContext(HabitContext);

  const todayIndex = days.findIndex(d => dayjs(d.date).isSame(dayjs(), "day"));
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex >= 0 ? todayIndex : 0);

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 2, md: 4 }, bgcolor: "#F9FAFB" }}>
      <Container maxWidth="md">

        {/* HEADER */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={800}>
            Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Watch your consistency grow, day by day
          </Typography>
        </Box>

        {/* CALENDAR */}
        <Box
          sx={{
            mb: 3,
            p: { xs: 1, md: 2 },
            bgcolor: "#FFFFFF",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          }}
        >
          <HabitCalendar
            days={days}
            selectedIndex={selectedDayIndex}
            onSelect={setSelectedDayIndex}
          />
        </Box>

        {/* DASHBOARD CARD */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <ProgressDashboard
            days={days}
            selectedDayIndex={selectedDayIndex}
          />
        </Box>

        {/* Auto Save Info */}
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Typography variant="caption" color="success.main">
            Auto saved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Progress;