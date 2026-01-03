import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import KPISection from "./KPISection";
import ProgressChart from "./ProgressChart";

const ProgressDashboard = ({
  days,
  selectedDayIndex,
  view,
  onViewChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",          // ✅ CENTER DASHBOARD
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,                  // ✅ PREVENT OVER-STRETCH
        }}
      >
        {/* 🔹 FILTER SECTION */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "#FFFFFF",
            pb: 1,
          }}
        >
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => val && onViewChange(val)}
            sx={{
              bgcolor: "#F1F3F5",
              borderRadius: 4,
              p: 0.5,
              display: "flex",
              gap: 0.5,
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {["daily", "weekly", "monthly"].map(v => (
              <ToggleButton
                key={v}
                value={v}
                sx={{
                  textTransform: "capitalize",
                  px: { xs: 2, md: 3 },
                  borderRadius: 3,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  color: "text.secondary",
                  "&.Mui-selected": {
                    bgcolor: "#7C4DFF",
                    color: "#fff",
                    boxShadow: "0 6px 16px rgba(124,77,255,0.4)",
                    "&:hover": { bgcolor: "#6A3DF0" },
                  },
                }}
              >
                {v}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 🔹 KPI SECTION */}
        <Box sx={{ mb: 5 }}>
          <KPISection
            days={days}
            selectedDayIndex={selectedDayIndex}
            view={view}
          />
        </Box>

        {/* 🔹 CHART SECTION */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 900,               // ✅ CENTER + BALANCE CHART
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              background:
                "linear-gradient(180deg, #FAFAFF 0%, #FFFFFF 100%)",
              border: "1px solid #EEE",
            }}
          >
            <Typography
              fontWeight={800}
              mb={2}
              textAlign="center"
              sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
            >
              Progress Overview
            </Typography>

            <ProgressChart
              days={days}
              selectedDayIndex={selectedDayIndex}
              view={view}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressDashboard;
