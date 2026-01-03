import { useContext, useState } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitCalendar from "../components/habit/HabitCalendar";
import ProgressDashboard from "../components/dashboard/ProgressDashboard";
import ExportButton from "../components/common/ExportButton";
import { Box, Typography, Container, Divider } from "@mui/material";
import dayjs from "dayjs";

const Progress = () => {
  const { days } = useContext(HabitContext);

  if (!days || days.length === 0) {
    return <Typography p={2}>Loading progress...</Typography>;
  }

  const todayIndex = days.findIndex(d =>
    dayjs(d.date).isSame(dayjs(), "day")
  );

  const [selectedDayIndex, setSelectedDayIndex] = useState(
    todayIndex >= 0 ? todayIndex : 0
  );

  const [view, setView] = useState("daily");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F9FAFB",
        py: { xs: 1.5, md: 2 },
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box sx={{ mb: 1.5 }}>
          <Typography
            fontWeight={800}
            sx={{ fontSize: { xs: "1.2rem", md: "1.4rem" } }}
          >
            Progress
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Track your consistency
          </Typography>
        </Box>

        {/* CALENDAR */}
        <Box
          sx={{
            mb: 2,
            p: 1,
            bgcolor: "#FFFFFF",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <HabitCalendar
            days={days}
            selectedIndex={selectedDayIndex}
            onSelect={setSelectedDayIndex}
          />
        </Box>

        {/* DASHBOARD + EXPORT */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Dashboard Content */}
          <Box sx={{ p: { xs: 1.5, md: 2 } }}>
            <ProgressDashboard
              days={days}
              selectedDayIndex={selectedDayIndex}
              view={view}
              onViewChange={setView}
            />
          </Box>

          {/* Divider */}
          <Divider />

          {/* Export Section */}
          <Box
            sx={{
              p: { xs: 2, md: 2.5 },
              bgcolor: "#FAFAFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: "200px" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ mb: 0.5 }}
              >
                📥 Export Your Data
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Download complete habit tracker with daily logs, notes, and monthly summary
              </Typography>
            </Box>

            <Box sx={{ minWidth: { xs: "100%", sm: "200px" } }}>
              <ExportButton />
            </Box>
          </Box>
        </Box>

        {/* Footer Info */}
        <Box sx={{ textAlign: "center", mt: 2, mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            All data is auto-saved • Last updated: {dayjs().format("HH:mm")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Progress;