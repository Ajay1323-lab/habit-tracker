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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import EventIcon from "@mui/icons-material/Event";

import Confetti from "react-confetti";
import dayjs from "dayjs";
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

  const [editingId, setEditingId] = useState(null);
  const [editTarget, setEditTarget] = useState("");

  const [deletedGoal, setDeletedGoal] = useState(null);
  const [deleteSnack, setDeleteSnack] = useState(false);




  const [newGoal, setNewGoal] = useState({
    habitKey: "",
    target: 80,
    expiry: "",
  });

  /* -------------------- PERSIST -------------------- */
  useEffect(() => {
    localStorage.setItem("habit-goals", JSON.stringify(goals));
  }, [goals]);

  /* -------------------- PROGRESS -------------------- */
  const progress = (g) => {
    const done = days.filter(
      (d) => d?.habits?.[g.habitKey]?.done
    ).length;
    return days.length ? Math.round((done / days.length) * 100) : 0;
  };

  /* -------------------- ADD GOAL -------------------- */
  const handleAddGoal = () => {
    if (!newGoal.habitKey) return;

    setGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        habitKey: newGoal.habitKey,
        target: Number(newGoal.target),
        expiry: newGoal.expiry || null,
        achieved: false,
        celebrated: false,
      },
    ]);

    setNewGoal({ habitKey: "", target: 80, expiry: "" });
    setOpen(false);
  };

  /* -------------------- DELETE -------------------- */
  const handleDeleteGoal = (goal) => {
    setDeletedGoal(goal);
    setGoals((prev) => prev.filter((g) => g.id !== goal.id));
    setDeleteSnack(true);
  };


  /* -------------------- ACHIEVEMENT -------------------- */
  useEffect(() => {
    setGoals((prev) =>
      prev.map((g) => {
        const p = progress(g);
        const expired =
          g.expiry &&
          dayjs(g.expiry).endOf("day").isBefore(dayjs());

        if (p >= g.target && !g.celebrated) {
          setCelebrate(true);
          setToast(true);
          setTimeout(() => setCelebrate(false), 3500);

          return {
            ...g,
            achieved: true,
            celebrated: true,
          };
        }

        return {
          ...g,
          achieved: p >= g.target,
          expired,
        };
      })
    );
  }, [days]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        background: "linear-gradient(180deg,#f8fafc,#eef2ff)",
      }}
    >
      {celebrate && <Confetti recycle={false} numberOfPieces={280} />}

      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ fontWeight: 700 }}>
          🎉 Goal achieved! Keep it going!
        </Alert>
      </Snackbar>

      <Box maxWidth={1100} mx="auto">

        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Box display="flex" justifyContent="center" gap={1}>
            <EmojiEventsIcon sx={{ color: "#4f46e5" }} />
            <Typography variant="h5" fontWeight={800}>
              Goals
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Set targets, stay consistent, celebrate wins
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

            const expired =
              g.expiry &&
              dayjs(g.expiry).endOf("day").isBefore(dayjs());

            return (
              <Card
                key={g.id}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
                }}
              >
                {/* HEADER */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" gap={2}>
                    <Box fontSize={32}>{habit?.icon || "🎯"}</Box>
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
                          sx={{ mt: 0.5 }}
                        />
                      )}

                      {expired && !g.achieved && (
                        <Chip
                          label="Expired"
                          color="error"
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Box>
                    {editingId === g.id ? (
                      <IconButton
                        onClick={() => {
                          setGoals((prev) =>
                            prev.map((x) =>
                              x.id === g.id
                                ? { ...x, target: Number(editTarget) }
                                : x
                            )
                          );
                          setEditingId(null);
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setEditingId(g.id);
                          setEditTarget(g.target);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}

                    <IconButton onClick={() => handleDeleteGoal(g)}>
                      <DeleteIcon />
                    </IconButton>

                  </Box>
                </Box>

                {/* PROGRESS */}
                <Box mt={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography color="text.secondary">
                      Progress
                    </Typography>
                    <Typography
                      fontWeight={700}
                      color={
                        g.achieved
                          ? "success.main"
                          : expired
                            ? "error.main"
                            : "primary.main"
                      }
                    >
                      {actualProgress}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={displayProgress}
                    sx={{
                      height: 10,
                      borderRadius: 6,
                      mt: 1,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 6,
                        background: g.achieved
                          ? "linear-gradient(90deg,#16a34a,#4ade80)"
                          : expired
                            ? "linear-gradient(90deg,#dc2626,#ef4444)"
                            : "linear-gradient(90deg,#6366f1,#818cf8)",
                      },
                    }}
                  />

                  <Box
                    mt={1}
                    display="flex"
                    justifyContent="space-between"
                  >
                    {editingId === g.id ? (
                      <TextField
                        type="number"
                        size="small"
                        value={editTarget}
                        onChange={(e) => setEditTarget(e.target.value)}
                        sx={{ width: 100 }}
                      />
                    ) : (
                      <Typography variant="caption">
                        Target {g.target}%
                      </Typography>
                    )}

                    <Typography variant="caption">
                      {
                        days.filter(
                          (d) =>
                            d?.habits?.[g.habitKey]?.done
                        ).length
                      }
                      /{days.length} days
                    </Typography>
                  </Box>
                </Box>

                {/* EXPIRY */}
                {g.expiry && (
                  <Box
                    mt={2}
                    display="flex"
                    justifyContent="center"
                    gap={1}
                    py={0.8}
                    borderRadius={2}
                    sx={{ background: "#eef2ff" }}
                  >
                    <EventIcon fontSize="small" color="primary" />
                    <Typography variant="caption">
                      Expires on {dayjs(g.expiry).format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                )}

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
                      ? "#ecfdf5"
                      : expired
                        ? "#fef2f2"
                        : "#eef2ff",
                  }}
                >
                  {g.achieved ? (
                    <CheckCircleIcon color="success" />
                  ) : expired ? (
                    <WarningAmberIcon color="error" />
                  ) : (
                    <TrendingUpIcon color="primary" />
                  )}
                  <Typography fontWeight={700}>
                    {g.achieved
                      ? "Goal achieved 🎉"
                      : expired
                        ? "Goal expired ⏰"
                        : "Keep going 💪"}
                  </Typography>
                </Box>
              </Card>
            );
          })}
        </Box>

        {/* ADD GOAL */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ px: 4, py: 1.2 }}
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
                borderRadius: 4,
                width: { xs: "90%", sm: 400 },
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              }}
            >
              <Typography fontWeight={800} mb={2}>
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
                sx={{ mb: 2 }}
              />

              <TextField
                type="date"
                label="Expiry Date (optional)"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newGoal.expiry}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    expiry: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleAddGoal}
                sx={{ py: 1.2 }}
              >
                Create Goal
              </Button>
            </Box>
          </Fade>
        </Modal>

        <Snackbar
          open={deleteSnack}
          autoHideDuration={4000}
          onClose={() => setDeleteSnack(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="warning"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  setGoals((prev) => [...prev, deletedGoal]);
                  setDeletedGoal(null);
                  setDeleteSnack(false);
                }}
              >
                UNDO
              </Button>
            }
          >
            Goal deleted
          </Alert>
        </Snackbar>

      </Box>
    </Box>
  );
};

export default Goals;
