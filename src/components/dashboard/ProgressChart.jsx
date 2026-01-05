// ProgressChart.js — Final Touch (already perfect, just minor polish)
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { calculateDayScore } from "../../services/habitService";
import { useContext, useState } from "react";

const COLORS = { primary: "#7C4DFF", muted: "#E0E0E0" };

const ProgressChart = ({ days, selectedDayIndex, view }) => {
  if (view === "daily") {
    const day = days[selectedDayIndex];
    const total = Object.keys(day.habits).length;
    const done = Object.values(day.habits).filter(h => h.done).length;
   const percent = total === 0 ? 0 : Math.round((done / total) * 100); 

    const data = [
      { name: "Done", value: done },
      { name: "Pending", value: total - done },
    ];

    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={4}
          >
            <Cell fill={COLORS.primary} />
            <Cell fill={COLORS.muted} />
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 36, fontWeight: 800, fill: COLORS.primary }}>
            {percent}%
          </text>
          <text x="50%" y="58%" textAnchor="middle" style={{ fontSize: 14, fill: "#666" }}>
            Completed Today
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (view === "weekly") {
    const data = days
      .slice(Math.max(0, selectedDayIndex - 6), selectedDayIndex + 1)
      .map(d => ({
        day: dayjs(d.date).format("ddd"),
        score: calculateDayScore(d),
      }));

    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="day" tick={{ fontSize: 13 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="score" fill={COLORS.primary} radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Monthly Line Chart
  const monthData = days
    .filter(d => dayjs(d.date).month() === dayjs(days[selectedDayIndex].date).month())
    .map(d => ({
      date: dayjs(d.date).format("D"),
      score: calculateDayScore(d),
    }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={monthData}>
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => `${v}%`} />
        <Line
          type="monotone"
          dataKey="score"
          stroke={COLORS.primary}
          strokeWidth={4}
          dot={{ fill: COLORS.primary, r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;