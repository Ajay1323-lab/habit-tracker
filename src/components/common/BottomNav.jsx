

import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TodayIcon from "@mui/icons-material/Today";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";

const AppBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/today", label: "Today", icon: <TodayIcon /> },
    { path: "/progress", label: "Progress", icon: <TrendingUpIcon /> },
    { path: "/streaks", label: "Streaks", icon: <LocalFireDepartmentIcon /> },
    { path: "/insights", label: "Insights", icon: <InsightsIcon /> },
    { path: "/goals", label: "Goals", icon: <EmojiEventsIcon /> },
    { path: "/profile", label: "Profile", icon: <PersonIcon /> },
  ];

  const currentPath = location.pathname;
  const currentIndex = routes.findIndex(route => route.path === currentPath);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentIndex}
        onChange={(event, newValue) => {
          navigate(routes[newValue].path);
        }}
        showLabels
        sx={{
          height: 64,
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            padding: "6px 8px",
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.65rem",
          },
        }}
      >
        {routes.map((route) => (
          <BottomNavigationAction
            key={route.path}
            label={route.label}
            icon={route.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default AppBottomNavigation;
