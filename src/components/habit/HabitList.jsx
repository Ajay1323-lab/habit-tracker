import { useContext, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

import { HabitContext } from "../../context/HabitContext";

const HabitList = ({ dayIndex }) => {
  const {
    days,
    habitMaster,
    toggleHabit,
    updateHabitNote,
    deleteHabit,
  } = useContext(HabitContext);

  const [editingHabit, setEditingHabit] = useState(null);

  if (!days || !days[dayIndex]) return null;

  const habits = days[dayIndex].habits;

  // Keep order as defined in habitMaster
  const habitKeys = habitMaster.map(h => h.key);

  return (
    <Box>
      {habitKeys.map(habitKey => {
        const habitMeta = habitMaster.find(h => h.key === habitKey);
        const habit = habits[habitKey];

        if (!habitMeta || !habit) return null;

        return (
          <Box
            key={habitKey}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: habit.done ? habitMeta.color : "#FFFFFF",
              border: "1px solid",
              borderColor: habit.done ? "transparent" : "#E0E0E0",
              transition: "all 0.25s ease",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* TOP ROW */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography fontWeight={600}>
                {habitMeta.icon} {habitMeta.label}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={() =>
                    setEditingHabit(
                      editingHabit === habitKey ? null : habitKey
                    )
                  }
                >
                  <EditNoteIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteHabit(habitKey)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                <Checkbox
                  checked={habit.done}
                  onChange={() => toggleHabit(dayIndex, habitKey)}
                  icon={
                    <CheckCircleIcon sx={{ opacity: 0.3, fontSize: 28 }} />
                  }
                  checkedIcon={
                    <CheckCircleIcon
                      sx={{ color: "#2E7D32", fontSize: 28 }}
                    />
                  }
                />
              </Box>
            </Box>

            {/* NOTE VIEW */}
            {habit.note && editingHabit !== habitKey && (
              <Box mt={1.5}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontStyle: "italic" }}
                >
                  📝 {habit.note}
                </Typography>
              </Box>
            )}

            {/* NOTE EDIT */}
            {editingHabit === habitKey && (
              <Box mt={1.5}>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  value={habit.note}
                  onChange={e =>
                    updateHabitNote(dayIndex, habitKey, e.target.value)
                  }
                  onBlur={() => setEditingHabit(null)}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default HabitList;
