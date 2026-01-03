import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { calculateDayScore } from "../../services/habitService";
import { Box } from "@mui/material";

const COLORS = {
  primary: "#7C4DFF",
  muted: "#E0E0E0",
  success: "#2E7D32",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: "8px 12px",
        borderRadius: 2,
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        fontSize: 13,
      }}
    >
      <strong>{label}</strong>
      <div>{payload[0].value}%</div>
    </Box>
  );
};

const ChartWrapper = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",      // ✅ CENTER CHART
    }}
  >
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,               // ✅ PREVENT OVER-STRETCH
        height: { xs: 240, md: 280 },// ✅ RESPONSIVE HEIGHT
      }}
    >
      {children}
    </Box>
  </Box>
);

const ProgressChart = ({ days, selectedDayIndex, view }) => {
  let data = [];

  /* ---------------- DAILY (PIE) ---------------- */
  if (view === "daily") {
    const day = days[selectedDayIndex];
    const total = Object.keys(day.habits).length;
    const done = Object.values(day.habits).filter(h => h.done).length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    data = [
      { name: "Done", value: done },
      { name: "Missed", value: total - done },
    ];

    return (
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={6}
            >
              <Cell fill={COLORS.primary} />
              <Cell fill={COLORS.muted} />
            </Pie>

            {/* Center Text */}
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 24, fontWeight: 800 }}
            >
              {percent}%
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 12, fill: "#666" }}
            >
              Today
            </text>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }

  /* ---------------- WEEKLY (BAR) ---------------- */
  if (view === "weekly") {
    data = days
      .slice(Math.max(0, selectedDayIndex - 6), selectedDayIndex + 1)
      .map(d => ({
        label: dayjs(d.date).format("dd"),
        score: calculateDayScore(d),
      }));

    return (
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <XAxis dataKey="label" tickLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="score"
              fill={COLORS.primary}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }

  /* ---------------- MONTHLY (LINE) ---------------- */
  if (view === "monthly") {
    const month = dayjs(days[selectedDayIndex].date).month();
    data = days
      .filter(d => dayjs(d.date).month() === month)
      .map(d => ({
        label: dayjs(d.date).format("DD"),
        score: calculateDayScore(d),
      }));

    return (
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" tickLine={false} />
            <YAxis domain={[0, 100]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke={COLORS.primary}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    );
  }


  return null;
};

export default ProgressChart;
