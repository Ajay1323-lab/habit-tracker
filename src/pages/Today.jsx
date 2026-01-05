import { useContext, useState } from "react";
import {
  Box, Container, Typography, IconButton,
  Modal, TextField, Button, Alert, Snackbar, Card, CardMedia, CardContent
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

import { HabitContext } from "../context/HabitContext";
import { ICON_OPTIONS, COLOR_OPTIONS } from "../utils/habitUiOptions";
import HabitList from "../components/habit/HabitList";
import HabitCalendar from "../components/habit/HabitCalendar";

// Compact & beautiful motivational image (perfect ratio)
const MOTIVATIONAL_IMAGE_URL = "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&h=400&fit=crop";

const Today = () => {
  const { days, addHabit, hasCompleteProfile, habitMaster } = useContext(HabitContext);

  const todayIndex = days.findIndex(d => dayjs(d.date).isSame(dayjs(), "day"));
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex >= 0 ? todayIndex : 0);

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showWelcomeCard = habitMaster.length === 0;

  const handleAdd = () => {
    if (!hasCompleteProfile) {
      setSnackbarMessage("Please complete your profile first!");
      setSnackbarOpen(true);
      setOpen(false);
      return;
    }
    if (!label.trim()) return;
    
    addHabit({ label, icon, color });
    setLabel("");
    setIcon(ICON_OPTIONS[0]);
    setColor(COLOR_OPTIONS[0]);
    setOpen(false);
  };

  const selectedDate = dayjs(days[selectedDayIndex]?.date);

  // COMPACT & RESPONSIVE WELCOME CARD
  const WelcomeCard = () => (
    <Card 
      elevation={10}
      sx={{ 
        mb: 3, 
        borderRadius: 3, 
        overflow: 'hidden',
        maxWidth: 480,
        mx: 'auto',
        bgcolor: 'grey.900',
        color: 'white',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        
        <CardMedia
          component="img"
          image={MOTIVATIONAL_IMAGE_URL}
          alt="Your journey starts now"
          sx={{ 
            width: { xs: '100%', sm: 180 },
            height: { xs: 160, sm: '100%' },
            objectFit: 'cover',
          }}
        />

        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1, lineHeight: 1.2 }}>
            Your Future Self
            <Box component="span" sx={{ color: '#FFD700' }}> Is Counting On You</Box>
          </Typography>

          <Typography variant="body2" sx={{ mb: 2.5, opacity: 0.95 }}>
            One small habit today = unstoppable version of you tomorrow.
          </Typography>

          <Button
            variant="contained"
            size="medium"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: '#FFD700',
              color: '#000',
              fontWeight: 700,
              alignSelf: 'flex-start',
              px: 3,
              borderRadius: 2,
              boxShadow: '0 6px 20px rgba(255,215,0,0.4)',
              '&:hover': {
                bgcolor: '#FFC107',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(255,215,0,0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add First Habit
          </Button>
        </CardContent>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 2, md: 4 }, bgcolor: "#F9FAFB" }}>
      <Container maxWidth="md">
        
  

        {/* CALENDAR */}
        <Box sx={{ mb: 3, p: { xs: 1, md: 2 }, bgcolor: "#FFFFFF", borderRadius: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
          <HabitCalendar days={days} selectedIndex={selectedDayIndex} onSelect={setSelectedDayIndex} />
        </Box>

        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {selectedDate.isSame(dayjs(), "day") ? "Today" : "Habits"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedDate.format("dddd, DD MMMM YYYY")}
            </Typography>
          </Box>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{ bgcolor: "primary.main", color: "#fff", "&:hover": { bgcolor: "primary.dark" } }}
          >
            <AddIcon />
          </IconButton>
        </Box>

    {/* Small, beautiful welcome card — only once */}
        {showWelcomeCard && <WelcomeCard />}

        <HabitList dayIndex={selectedDayIndex} />

        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Typography variant="caption" color="success.main">
            Auto saved
          </Typography>
        </Box>
      </Container>

      {/* ADD HABIT MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", p: 4, borderRadius: 3, width: { xs: "92%", sm: 420 }, boxShadow: 24 }}>
          <Typography variant="h6" fontWeight={700} mb={3} textAlign="center">
            What will you improve today?
          </Typography>

          <TextField fullWidth label="Habit name" value={label} onChange={e => setLabel(e.target.value)} sx={{ mb: 3 }} />

          <Typography variant="subtitle2" mb={1}>Choose Icon:</Typography>
          <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
            {ICON_OPTIONS.map(i => (
              <Button key={i} variant={icon === i ? "contained" : "outlined"} onClick={() => setIcon(i)} sx={{ minWidth: 48, minHeight: 48, fontSize: 26 }}>
                {i}
              </Button>
            ))}
          </Box>

          <Typography variant="subtitle2" mb={1}>Choose Color:</Typography>
          <Box display="flex" gap={1.5} mb={4} justifyContent="center">
            {COLOR_OPTIONS.map(c => (
              <Box
                key={c}
                onClick={() => setColor(c)}
                sx={{
                  width: 40,
                  height: 30,
                  bgcolor: c,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: color === c ? "4px solid #000" : "3px solid #fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "0.2s",
                  "&:hover": { transform: "scale(1.2)" }
                }}
              />
            ))}
          </Box>

          <Button fullWidth variant="contained" size="large" onClick={handleAdd}>
            Start This Habit
          </Button>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Today;