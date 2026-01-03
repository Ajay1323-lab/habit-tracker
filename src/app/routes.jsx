import { Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Welcome from "../pages/Welcome";
import Today from "../pages/Today";
import Progress from "../pages/Progress";
import Goals from "../pages/Goals";
import Streaks from "../pages/Streaks";
import Profile from "../pages/Profile";
import Insights from "../pages/Insights"; 

const RoutesConfig = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/today" element={<Today />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/streaks" element={<Streaks />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </AppLayout>
);

export default RoutesConfig;
