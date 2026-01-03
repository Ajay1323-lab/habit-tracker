import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Avatar,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "userProfile";

/* 🔹 COMMON STYLE — CONSISTENT INPUT HEIGHT */
const commonTextFieldSx = {
  "& .MuiInputBase-root": {
    height: 56,
  },
  "& .MuiInputBase-input": {
    padding: "16.5px 14px",
  },
};

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    goal: "",
    bio: "",
  });

  const [error, setError] = useState("");

  /* 🔹 LOAD PROFILE */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  /* 🔹 HANDLE CHANGE */
  const handleChange = (field) => (e) => {
    setProfile(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /* 🔹 SAVE PROFILE */
const handleSave = () => {
  if (!profile.email.trim()) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

  window.dispatchEvent(new Event("storage")); // 🔥 notify context
  navigate("/today");
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F9FAFB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 3,
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
          }}
        >
          {/* 🔹 HEADER */}
          <Box
            textAlign="center"
            mb={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: "primary.main",
                mb: 1,
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>

            <Typography variant="h6" fontWeight={700}>
              My Profile
            </Typography>

            <Typography variant="body2" color="text.secondary">
              This email will be used to track your habits
            </Typography>
          </Box>

          {/* 🔹 FORM */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.name}
                onChange={handleChange("name")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email *"
                type="email"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.email}
                onChange={handleChange("email")}
                error={!!error}
                helperText={error}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                type="number"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.age}
                onChange={handleChange("age")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Gender"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.gender}
                onChange={handleChange("gender")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Primary Goal"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.goal}
                onChange={handleChange("goal")}
                placeholder="e.g. Get disciplined, Job ready"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="About You"
                fullWidth
                multiline
                rows={3}
                value={profile.bio}
                onChange={handleChange("bio")}
                placeholder="Short note about yourself"
              />
            </Grid>
          </Grid>

          {/* 🔹 SAVE BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              height: 52,
              fontWeight: 700,
              borderRadius: 2,
            }}
            onClick={handleSave}
          >
            Save Profile
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
