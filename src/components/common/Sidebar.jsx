import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TodayIcon from "@mui/icons-material/Today";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainRoutes = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/today", label: "Today", icon: <TodayIcon /> },
    { path: "/progress", label: "Progress", icon: <TrendingUpIcon /> },
  ];

  const analyticsRoutes = [
    { path: "/streaks", label: "Streaks", icon: <LocalFireDepartmentIcon /> },
    { path: "/insights", label: "Insights", icon: <InsightsIcon /> },
    { path: "/goals", label: "Goals", icon: <EmojiEventsIcon /> },
  ];

  const bottomRoutes = [
    { path: "/profile", label: "Profile", icon: <PersonIcon /> },
  ];

  const renderNavItems = (routes) => (
    <List>
      {routes.map((route) => (
        <ListItem key={route.path} disablePadding>
          <ListItemButton
            selected={location.pathname === route.path}
            onClick={() => navigate(route.path)}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: "#1976D2",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#1565C0",
                },
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: location.pathname === route.path ? "#fff" : "inherit",
              }}
            >
              {route.icon}
            </ListItemIcon>
            <ListItemText 
              primary={route.label}
              primaryTypographyProps={{
                fontWeight: location.pathname === route.path ? 700 : 500,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
   <Drawer
  variant="permanent"
  sx={{
    display: { xs: "none", md: "block" },
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      position: "relative", // 👈 IMPORTANT
      borderRight: "1px solid #E0E0E0",
      bgcolor: "#F9FAFB",
    },
  }}
>

      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={800} sx={{ color: "#1976D2" }}>
          Habit Tracker
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Build better habits
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ overflow: "auto", flex: 1, py: 2 }}>
        <Typography
          variant="caption"
          sx={{ px: 2, color: "text.secondary", fontWeight: 700 }}
        >
          MAIN
        </Typography>
        {renderNavItems(mainRoutes)}

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="caption"
          sx={{ px: 2, color: "text.secondary", fontWeight: 700 }}
        >
          ANALYTICS
        </Typography>
        {renderNavItems(analyticsRoutes)}
      </Box>

      <Divider />
      
      <Box sx={{ py: 2 }}>
        {renderNavItems(bottomRoutes)}
      </Box>
    </Drawer>
  );
};

export default Sidebar;