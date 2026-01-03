// import { useContext, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   IconButton,
//   Modal,
//   TextField,
//   Button,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import dayjs from "dayjs";

// import { HabitContext } from "../context/HabitContext";
// import HabitCalendar from "../components/habit/HabitCalendar";
// import HabitList from "../components/habit/HabitList";

// const Today = () => {
//   const { days, addHabit } = useContext(HabitContext);

//   /* 🔹 Find today index */
//   const todayIndex = days.findIndex(d =>
//     dayjs(d.date).isSame(dayjs(), "day")
//   );

//   if (todayIndex < 0) return null;

//   /* 🔹 Selected day state (IMPORTANT FIX) */
//   const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);

//   /* 🔹 Add habit modal */
//   const [open, setOpen] = useState(false);
//   const [newHabit, setNewHabit] = useState("");

//   const handleAddHabit = () => {
//     if (!newHabit.trim()) return;
//     addHabit(newHabit);
//     setNewHabit("");
//     setOpen(false);
//   };

//   const selectedDate = dayjs(days[selectedDayIndex].date);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: { xs: 2, md: 4 },
//         bgcolor: "#F9FAFB",
//       }}
//     >
//       <Container maxWidth="md">

//         {/* 🔹 CALENDAR */}
//         <Box
//           sx={{
//             mb: 3,
//             p: { xs: 1, md: 2 },
//             bgcolor: "#FFFFFF",
//             borderRadius: 3,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
//           }}
//         >
//           <HabitCalendar
//             days={days}
//             selectedIndex={selectedDayIndex}
//             onSelect={setSelectedDayIndex}
//           />
//         </Box>

//         {/* 🔹 HEADER */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Box>
//             <Typography variant="h5" fontWeight={700}>
//               {selectedDate.isSame(dayjs(), "day") ? "Today" : "Habits"}
//             </Typography>

//             <Typography variant="body2" color="text.secondary">
//               {selectedDate.format("dddd, DD MMMM YYYY")}
//             </Typography>
//           </Box>

//           <IconButton
//             onClick={() => setOpen(true)}
//             sx={{
//               bgcolor: "primary.main",
//               color: "#fff",
//               "&:hover": { bgcolor: "primary.dark" },
//             }}
//           >
//             <AddIcon />
//           </IconButton>
//         </Box>

//         {/* 🔹 HABIT LIST (CHANGES WITH DATE) */}
//         <HabitList dayIndex={selectedDayIndex} />

//         {/* 🔹 AUTO SAVE INFO */}
//         <Box sx={{ textAlign: "right", mt: 2 }}>
//           <Typography variant="caption" color="success.main">
//             ✔ Auto saved
//           </Typography>
//         </Box>
//       </Container>

//       {/* 🔹 ADD HABIT MODAL */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             p: 3,
//             borderRadius: 2,
//             width: 320,
//           }}
//         >
//           <Typography mb={2} fontWeight={600}>
//             Add New Habit
//           </Typography>

//           <TextField
//             fullWidth
//             label="Habit name"
//             value={newHabit}
//             onChange={e => setNewHabit(e.target.value)}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={handleAddHabit}
//           >
//             Add Habit
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Today;


import { useContext, useState } from "react";
import {
  Box, Container, Typography, IconButton,
  Modal, TextField, Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

import { HabitContext } from "../context/HabitContext";
import { ICON_OPTIONS, COLOR_OPTIONS } from "../utils/habitUiOptions";
import HabitList from "../components/habit/HabitList";
import HabitCalendar from "../components/habit/HabitCalendar";

const Today = () => {
  const { days, addHabit, hasEmail } = useContext(HabitContext);

  const todayIndex = days.findIndex(d =>
    dayjs(d.date).isSame(dayjs(), "day")
  );
  
    const [selectedDayIndex, setSelectedDayIndex] = useState(
      todayIndex >= 0 ? todayIndex : 0
    );

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  const handleAdd = () => {
    if (!label.trim()) return;
    addHabit({ label, icon, color });
    setLabel("");
    setOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      {/* CALENDAR */}
      <Box
        sx={{
          mb: 2,
          p: 1,
          bgcolor: "#FFFFFF",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <HabitCalendar
          days={days}
          selectedIndex={selectedDayIndex}
          onSelect={setSelectedDayIndex}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>Today</Typography>
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      <HabitList dayIndex={todayIndex} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 3, bgcolor: "#fff", width: 320, mx: "auto", mt: "20%" }}>
          <TextField
            fullWidth
            label="Habit name"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />

          <Box mt={2} display="flex" gap={1} flexWrap="wrap">
            {ICON_OPTIONS.map(i => (
              <Button
                key={i}
                variant={icon === i ? "contained" : "outlined"}
                onClick={() => setIcon(i)}
              >
                {i}
              </Button>
            ))}
          </Box>

          <Box mt={2} display="flex" gap={1}>
            {COLOR_OPTIONS.map(c => (
              <Box
                key={c}
                onClick={() => setColor(c)}
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: c,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: color === c ? "3px solid #000" : "2px solid #fff",
                }}
              />
            ))}
          </Box>

          <Button fullWidth sx={{ mt: 2 }} onClick={handleAdd}>
            Add Habit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Today;
