import { Box, Paper, Typography, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const KPI = ({ label, value, accent, icon }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      height: 120,                  // ✅ FIXED HEIGHT
      width: "100%",                // ✅ RECTANGULAR
      borderRadius: 2.5,            // ✅ CLEAN RECTANGLE
      background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
      border: `1px solid ${accent}33`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.25s ease", // 🎯 SMOOTH ANIMATION
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.18)", // 🎯 ELEVATION
      },
    }}
  >
    {/* Top row */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 32 }}>
      <Box
        sx={{
          bgcolor: `${accent}22`,
          borderRadius: "50%",
          p: 0.8,
          display: "flex",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          color: "text.secondary",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Typography>
    </Box>

    {/* Value */}
    <Box
      sx={{
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "1.4rem", md: "1.6rem" },
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);


const KPISection = ({ days, selectedDayIndex, view }) => {
  let total = 0;
  let done = 0;
  let streak = 0;

  if (view === "daily") {
    Object.values(days[selectedDayIndex].habits).forEach(h => {
      total++;
      if (h.done) done++;
    });
  }

  if (view === "monthly") {
    const month = new Date(days[selectedDayIndex].date).getMonth();
    days
      .filter(d => new Date(d.date).getMonth() === month)
      .forEach(day => {
        Object.values(day.habits).forEach(h => {
          total++;
          if (h.done) done++;
        });
      });
  }

  for (let i = days.length - 1; i >= 0; i--) {
    const allDone = Object.values(days[i].habits).every(h => h.done);
    if (!allDone) break;
    streak++;
  }

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

return (
  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="stretch"          // ✅ EQUAL HEIGHT
      sx={{ maxWidth: 900 }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <KPI
          label="Completion"
          value={`${percent}%`}
          accent="#7C4DFF"
          icon={<CheckCircleOutlineIcon sx={{ color: "#7C4DFF" }} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <KPI
          label="Done"
          value={done}
          accent="#2E7D32"
          icon={<DoneAllIcon sx={{ color: "#2E7D32" }} />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <KPI
          label="Missed"
          value={total - done}
          accent="#ED6C02"
          icon={<CancelOutlinedIcon sx={{ color: "#ED6C02" }} />}
        />
      </Grid>
    </Grid>
  </Box>
);

};

export default KPISection;
