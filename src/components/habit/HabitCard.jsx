// HabitCard.jsx
import { Card, Typography, Checkbox, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const HabitCard = ({
  label,
  icon,
  color = "#667eea",
  checked = false,
  onChange,
  carousel = false,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: carousel ? 4 : 3,
        py: 2,
        minWidth: carousel ? 160 : "auto",
        background: checked
          ? "linear-gradient(135deg, #4ade80, #22c55e)"
          : `linear-gradient(135deg, ${color}, #ffffff55)`,
        color: "#1a202c",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        },
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography fontSize={22}>{icon}</Typography>
        <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      </Box>

      <Checkbox
        checked={checked}
        onChange={onChange}
        icon={<CheckCircleIcon sx={{ opacity: 0.3 }} />}
        checkedIcon={
          <CheckCircleIcon
            sx={{
              color: "#2e7d32",
              transform: "scale(1.3)",
              transition: "transform 0.3s ease",
            }}
          />
        }
      />
    </Card>
  );
};

export default HabitCard;
