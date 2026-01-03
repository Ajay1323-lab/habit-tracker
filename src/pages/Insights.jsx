import { useContext, useMemo, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  LinearProgress,
  Grid,
  IconButton,
  Collapse,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { HabitContext } from "../context/HabitContext";

/* ================= ANIMATED COUNTER ================= */
const AnimatedNumber = ({ value, duration = 800 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.round(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{display}</>;
};

const Insights = () => {
  const { days = [], habitMaster = [] } = useContext(HabitContext);
  const [openBreakdown, setOpenBreakdown] = useState(true);

  /* ================= CALCULATIONS ================= */
  const stats = useMemo(() => {
    return habitMaster.map((h) => {
      const done = days.filter((d) => d?.habits?.[h.key]?.done).length;
      const rate = days.length ? Math.round((done / days.length) * 100) : 0;
      return { ...h, done, rate };
    });
  }, [days, habitMaster]);

  const best = stats.length
    ? [...stats].sort((a, b) => b.rate - a.rate)[0]
    : null;

  const weak = stats.length
    ? [...stats].sort((a, b) => a.rate - b.rate)[0]
    : null;

  const avgCompletion = stats.length
    ? Math.round(stats.reduce((s, h) => s + h.rate, 0) / stats.length)
    : 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      {/* Center container with max width */}
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* ================= STICKY HEADER ================= */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            pb: 3,
            mb: 4,
            background: "linear-gradient(135deg,#667eea,#764ba2)",
          }}
        >
          <Box color="#fff" textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center" gap={1.5}>
              <TrendingUpIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" fontWeight={700}>
                Insights
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Visual overview of your habit performance
            </Typography>
          </Box>
        </Box>

        {/* ================= SUMMARY CARDS (FULL WIDTH STACKED) ================= */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4 }}>
          {/* Average */}
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              color: "#fff",
              borderRadius: 3,
              background: "linear-gradient(135deg,#5F2EEA,#7F3DFF)",
              boxShadow: "0 8px 24px rgba(95,46,234,0.3)",
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 48 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight={700}>
                <AnimatedNumber value={avgCompletion} />%
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Average Completion
              </Typography>
            </Box>
          </Card>

          {/* Best */}
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              color: "#fff",
              borderRadius: 3,
              background: "linear-gradient(135deg,#00C853,#00E676)",
              boxShadow: "0 8px 24px rgba(0,200,83,0.3)",
            }}
          >
            <StarIcon sx={{ fontSize: 48 }} />
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700} variant="h5">
                {best ? `${best.icon} ${best.label}` : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Best Habit (<AnimatedNumber value={best?.rate || 0} />%)
              </Typography>
            </Box>
          </Card>

          {/* Weak */}
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              color: "#fff",
              borderRadius: 3,
              background: "linear-gradient(135deg,#FF9800,#FF6F00)",
              boxShadow: "0 8px 24px rgba(255,152,0,0.3)",
            }}
          >
            <WarningAmberIcon sx={{ fontSize: 48 }} />
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700} variant="h5">
                {weak ? `${weak.icon} ${weak.label}` : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Needs Attention (<AnimatedNumber value={weak?.rate || 0} />%)
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* ================= COLLAPSIBLE BREAKDOWN ================= */}
        <Card
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.95)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <CheckCircleIcon color="primary" />
              <Typography variant="h6" fontWeight={700}>
                Habit Breakdown
              </Typography>
            </Box>

            <IconButton onClick={() => setOpenBreakdown((p) => !p)}>
              <ExpandMoreIcon
                sx={{
                  transform: openBreakdown ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            </IconButton>
          </Box>

          <Collapse in={openBreakdown}>
            {stats.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" py={3}>
                No habit data yet. Start tracking your habits.
              </Typography>
            ) : (
              <Box display="flex" flexDirection="column" gap={3}>
                {stats.map((h) => (
                  <Box key={h.key}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.5}
                    >
                      <Typography fontWeight={600}>
                        {h.icon} {h.label}
                      </Typography>
                      <Typography
                        fontWeight={700}
                        sx={{
                          color:
                            h.rate >= 70
                              ? "#2E7D32"
                              : h.rate >= 40
                              ? "#EF6C00"
                              : "#C62828",
                        }}
                      >
                        <AnimatedNumber value={h.rate} />%
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={h.rate}
                      sx={{
                        height: 10,
                        borderRadius: 6,
                        bgcolor: "#e5e7eb",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 6,
                          background:
                            h.rate >= 70
                              ? "linear-gradient(90deg,#4CAF50,#66BB6A)"
                              : h.rate >= 40
                              ? "linear-gradient(90deg,#FF9800,#FFB74D)"
                              : "linear-gradient(90deg,#F44336,#EF5350)",
                        },
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      mt={0.5}
                      display="block"
                    >
                      {h.done}/{days.length} days completed
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};

export default Insights;