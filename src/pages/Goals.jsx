import { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  LinearProgress,
  Button,
  Modal,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  Fade,
  Snackbar,
  Alert,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Confetti from "react-confetti";
import { HabitContext } from "../context/HabitContext";

const Goals = () => {
  const { days = [], habitMaster = [] } = useContext(HabitContext);

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("habit-goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const [newGoal, setNewGoal] = useState({
    habitKey: "",
    target: 80,
  });

  useEffect(() => {
    localStorage.setItem("habit-goals", JSON.stringify(goals));
  }, [goals]);

  const progress = (g) => {
    const done = days.filter(
      (d) => d?.habits?.[g.habitKey]?.done
    ).length;
    return days.length ? Math.round((done / days.length) * 100) : 0;
  };

  const handleAddGoal = () => {
    if (!newGoal.habitKey) return;

    setGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        habitKey: newGoal.habitKey,
        target: Number(newGoal.target),
        achieved: false,
        celebrated: false,
      },
    ]);

    setNewGoal({ habitKey: "", target: 80 });
    setOpen(false);
  };

  const handleDeleteGoal = (id) => {
    if (window.confirm("Delete this goal?")) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    }
  };

  // 🎯 Achievement Detection
  useEffect(() => {
    setGoals((prev) =>
      prev.map((g) => {
        const p = progress(g);

        if (p >= g.target && !g.celebrated) {
          setCelebrate(true);
          setToast(true);

          setTimeout(() => setCelebrate(false), 4000);

          return {
            ...g,
            achieved: true,
            celebrated: true,
          };
        }

        return {
          ...g,
          achieved: p >= g.target,
        };
      })
    );
  }, [days]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 3,
        py: 4,
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      {/* 🎊 CONFETTI */}
      {celebrate && <Confetti recycle={false} numberOfPieces={350} />}

      {/* 🔔 TOAST */}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ fontWeight: 700 }}
        >
          🎉 Goal Achieved! Keep up the great work!
        </Alert>
      </Snackbar>

      <Box maxWidth={1100} mx="auto">
        {/* HEADER */}
        <Box textAlign="center" mb={5} color="#fff">
          <Box display="flex" justifyContent="center" gap={1}>
            <EmojiEventsIcon />
            <Typography variant="h4" fontWeight={700}>
              Goals
            </Typography>
          </Box>
          <Typography sx={{ opacity: 0.9 }}>
            Track consistency & celebrate wins
          </Typography>
        </Box>

        {/* GOALS */}
        <Box display="flex" flexDirection="column" gap={3}>
          {goals.map((g) => {
            const actualProgress = progress(g);
            const displayProgress = g.achieved ? 100 : actualProgress;
            const habit = habitMaster.find(
              (h) => h.key === g.habitKey
            );

            return (
              <Card key={g.id} sx={{ p: 3, borderRadius: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" gap={2}>
                    <Box fontSize={30}>{habit?.icon || "🎯"}</Box>
                    <Box>
                      <Typography fontWeight={700}>
                        {habit?.label}
                      </Typography>
                      {g.achieved && (
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Achieved"
                          color="success"
                          size="small"
                        />
                      )}
                    </Box>
                  </Box>

                  <IconButton onClick={() => handleDeleteGoal(g.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>

                {/* PROGRESS */}
                <Box mt={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography color="text.secondary">
                      Progress
                    </Typography>
                    <Typography
                      fontWeight={700}
                      color={g.achieved ? "green" : "primary"}
                    >
                      {actualProgress}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={displayProgress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      mt: 1,
                      "& .MuiLinearProgress-bar": {
                        background: g.achieved
                          ? "linear-gradient(90deg,#43A047,#66BB6A)"
                          : "linear-gradient(90deg,#5E35B1,#7E57C2)",
                      },
                    }}
                  />

                  <Box
                    mt={1}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Typography variant="caption">
                      Target {g.target}%
                    </Typography>
                    <Typography variant="caption">
                      {days.filter(
                        (d) =>
                          d?.habits?.[g.habitKey]?.done
                      ).length}
                      /{days.length} days
                    </Typography>
                  </Box>
                </Box>

                {/* STATUS */}
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="center"
                  gap={1}
                  py={1}
                  borderRadius={2}
                  sx={{
                    background: g.achieved
                      ? "#E8F5E9"
                      : "#EDE7F6",
                  }}
                >
                  {g.achieved ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <TrendingUpIcon color="primary" />
                  )}
                  <Typography fontWeight={700}>
                    {g.achieved
                      ? "Goal Achieved 🎉"
                      : "Keep Going 💪"}
                  </Typography>
                </Box>
              </Card>
            );
          })}
        </Box>

        {/* ADD BUTTON */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Goal
          </Button>
        </Box>

        {/* MODAL */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                bgcolor: "#fff",
                p: 4,
                borderRadius: 3,
                width: 400,
              }}
            >
              <Typography fontWeight={700} mb={2}>
                Create Goal
              </Typography>

              <TextField
                select
                fullWidth
                label="Habit"
                value={newGoal.habitKey}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    habitKey: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              >
                {habitMaster.map((h) => (
                  <MenuItem key={h.key} value={h.key}>
                    {h.icon} {h.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                type="number"
                label="Target %"
                fullWidth
                value={newGoal.target}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    target: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleAddGoal}
              >
                Create Goal
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};

export default Goals;
