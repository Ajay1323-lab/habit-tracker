import { useContext, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { HabitContext } from "../context/HabitContext";

const AddHabit = () => {
  const { addHabit } = useContext(HabitContext);
  const [label, setLabel] = useState("");

  const handleAdd = () => {
    if (!label.trim()) return;

    addHabit({
      label,
      icon: "✨",
      color: "#FFFDE7",
    });

    setLabel("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Add your habit (e.g. Morning Walk)"
        value={label}
        onChange={e => setLabel(e.target.value)}
      />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
};

export default AddHabit;
