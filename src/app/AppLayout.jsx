import { Box } from "@mui/material";
import Sidebar from "../components/common/Sidebar";
import AppBottomNavigation from "../components/common/BottomNav";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar → Desktop only */}
      <Sidebar />

      {/* Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,              // 👈 IMPORTANT (fills remaining space)
          width: "100%",            // 👈 prevents shrink issues
          pb: { xs: 8, md: 0 },     // space only for bottom nav on mobile
          bgcolor: "#F9FAFB",
        }}
      >
        {children}
      </Box>

      {/* Bottom Nav → Mobile only */}
      <AppBottomNavigation />
    </Box>
  );
};

export default AppLayout;
