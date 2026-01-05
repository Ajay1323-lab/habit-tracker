// ProgressDashboard.js
import { Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import KPISection from "./KPISection";
import ProgressChart from "./ProgressChart";
import { useContext, useState } from "react";

const ProgressDashboard = ({ days, selectedDayIndex }) => {
  const [view, setView] = useState("daily");

  return (
    <Box sx={{ p: { xs: 2.5, md: 3 } }}>
      
      {/* View Toggle */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          sx={{
            bgcolor: "#F1F3F5",
            borderRadius: 3,
            p: 0.5,
          }}
        >
          {["daily", "weekly", "monthly"].map((v) => (
            <ToggleButton
              key={v}
              value={v}
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
                px: 3,
                py: 1,
                borderRadius: 3,
                color: view === v ? "#fff" : "text.primary",
                bgcolor: view === v ? "primary.main" : "transparent",
                "&:hover": {
                  bgcolor: view === v ? "primary.dark" : "rgba(0,0,0,0.06)",
                },
              }}
            >
              {v}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* KPI Section */}
      <KPISection days={days} selectedDayIndex={selectedDayIndex} view={view} />

      {/* Chart */}
      <Box
        sx={{
          mt: 5,
          p: { xs: 3, md: 4 },
          bgcolor: "linear-gradient(135deg, #FAFAFF 0%, #FFFFFF 100%)",
          borderRadius: 3,
          border: "1px solid #E3E6F0",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          textAlign="center"
          mb={3}
          color="primary.dark"
        >
          {view === "daily" && "Today's Completion"}
          {view === "weekly" && "This Week's Performance"}
          {view === "monthly" && "Monthly Progress Trend"}
        </Typography>

        <ProgressChart days={days} selectedDayIndex={selectedDayIndex} view={view} />
      </Box>
    </Box>
  );
};

export default ProgressDashboard;