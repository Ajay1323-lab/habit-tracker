import { useContext, useMemo, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  LinearProgress,
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
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;
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
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        background: "linear-gradient(180deg,#f8fafc,#eef2ff)",
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto" }}>

        {/* ================= HEADER ================= */}
        <Box textAlign="center" mb={4}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <TrendingUpIcon sx={{ color: "#4f46e5" }} />
            <Typography variant="h5" fontWeight={800}>
              Insights
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Understand your habit performance
          </Typography>
        </Box>

        {/* ================= SUMMARY CARDS ================= */}
        <Box display="flex" flexDirection="column" gap={2.5} mb={4}>
          {/* Average */}
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg,#6366f1,#818cf8)",
              color: "#fff",
              boxShadow: "0 12px 32px rgba(99,102,241,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 42 }} />
            <Box>
              <Typography variant="h3" fontWeight={800}>
                <AnimatedNumber value={avgCompletion} />%
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Average Completion
              </Typography>
            </Box>
          </Card>

          {/* Best */}
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg,#16a34a,#4ade80)",
              color: "#fff",
              boxShadow: "0 12px 32px rgba(22,163,74,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <StarIcon sx={{ fontSize: 42 }} />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {best ? `${best.icon} ${best.label}` : "N/A"}
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Best Habit (<AnimatedNumber value={best?.rate || 0} />%)
              </Typography>
            </Box>
          </Card>

          {/* Weak */}
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg,#f59e0b,#fbbf24)",
              color: "#fff",
              boxShadow: "0 12px 32px rgba(245,158,11,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <WarningAmberIcon sx={{ fontSize: 42 }} />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {weak ? `${weak.icon} ${weak.label}` : "N/A"}
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Needs Attention (<AnimatedNumber value={weak?.rate || 0} />%)
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* ================= BREAKDOWN ================= */}
        <Card
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            bgcolor: "#fff",
            boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" gap={1} alignItems="center">
              <CheckCircleIcon color="primary" />
              <Typography fontWeight={700}>
                Habit Breakdown
              </Typography>
            </Box>

            <IconButton onClick={() => setOpenBreakdown((p) => !p)}>
              <ExpandMoreIcon
                sx={{
                  transform: openBreakdown ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.3s",
                }}
              />
            </IconButton>
          </Box>

          <Collapse in={openBreakdown}>
            <Box mt={3} display="flex" flexDirection="column" gap={3}>
              {stats.map((h) => (
                <Box key={h.key}>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography fontWeight={600}>
                      {h.icon} {h.label}
                    </Typography>
                    <Typography
                      fontWeight={700}
                      color={
                        h.rate >= 70
                          ? "success.main"
                          : h.rate >= 40
                          ? "warning.main"
                          : "error.main"
                      }
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
                            ? "linear-gradient(90deg,#16a34a,#4ade80)"
                            : h.rate >= 40
                            ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                            : "linear-gradient(90deg,#dc2626,#ef4444)",
                      },
                    }}
                  />

                  <Typography variant="caption" color="text.secondary">
                    {h.done}/{days.length} days completed
                  </Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Card>
      </Box>
    </Box>
  );
};

export default Insights;
