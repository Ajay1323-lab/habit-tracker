import { useContext } from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { HabitContext } from "../../context/HabitContext";
import { exportToExcel } from "../../services/exportService";

const ExportButton = () => {
  const { days, habitMaster } = useContext(HabitContext);

  const handleExport = () => {
    if (!days || days.length === 0) {
      alert("No data to export!");
      return;
    }
    exportToExcel(days, habitMaster);
  };

  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<FileDownloadIcon />}
      sx={{ 
        mt: 2,
        bgcolor: "#2E7D32",
        "&:hover": {
          bgcolor: "#1B5E20"
        }
      }}
      onClick={handleExport}
    >
      Export to Excel
    </Button>
  );
};

export default ExportButton;