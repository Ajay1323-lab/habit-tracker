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
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "userProfile";

/* 
  🔹 MODERN INPUT STYLES 
  - Larger border radius for a friendlier feel.
  - Smooth transition on focus.
  - Custom focus ring color.
*/
const commonTextFieldSx = {
  width: "100%",
  "& .MuiInputBase-root": {
    height: 56, // Consistent height
    borderRadius: "16px", // Modern rounded corners
    backgroundColor: "#f9fafb",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent", // Remove default border for cleaner look
  },
  "& .Mui-focused": {
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6366f1", // Indigo focus ring
      borderWidth: 2,
    },
  },
  "& .Mui-error": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ef4444", // Red error ring
    },
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

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (field) => (e) => {
    setProfile((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  /* ---------------- SAVE PROFILE ---------------- */
  const handleSave = () => {
    if (!profile.email.trim()) {
      setError("Please enter a valid email address");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("storage"));
    navigate("/today");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Modern subtle gradient background
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, sm: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: "24px", // Very modern rounded card
            // Soft, diffused shadow instead of harsh shadow
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          {/* ---------------- HEADER ---------------- */}
          <Box
            textAlign="center"
            mb={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {/* Avatar with a subtle ring */}
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#6366f1",
                mb: 2,
                boxShadow: "0 8px 16px rgba(99, 102, 241, 0.3)",
                border: "3px solid #fff",
              }}
            >
              <PersonIcon sx={{ fontSize: 40, color: "#fff" }} />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight={700}
              color="#1e293b"
              gutterBottom
              sx={{ fontSize: { xs: "1.75rem", sm: "2.125rem" } }}
            >
              Profile Setup
            </Typography>

            <Typography
              variant="body1"
              color="#64748b"
              sx={{ maxWidth: 300, lineHeight: 1.5 }}
            >
              Tell us a bit about yourself so we can personalize your
              experience.
            </Typography>
          </Box>

          {/* ---------------- FORM ---------------- */}
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                placeholder="John Doe"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.name}
                onChange={handleChange("name")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.email}
                onChange={handleChange("email")}
                error={!!error}
                helperText={error ? error : " "}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label="Age"
                type="number"
                placeholder="25"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.age}
                onChange={handleChange("age")}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label="Gender"
                placeholder="Prefer not to say"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.gender}
                onChange={handleChange("gender")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Primary Goal"
                placeholder="e.g. Build discipline, Get job ready"
                fullWidth
                sx={commonTextFieldSx}
                value={profile.goal}
                onChange={handleChange("goal")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="About You"
                fullWidth
                multiline
                rows={3}
                placeholder="Short note about yourself..."
                value={profile.bio}
                onChange={handleChange("bio")}
                sx={{
                  ...commonTextFieldSx,
                  "& .MuiInputBase-root": {
                    height: "auto", // Allow multiline to grow
                    alignItems: "flex-start",
                    pt: 1.5,
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* ---------------- SAVE BUTTON ---------------- */}
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={handleSave}
            sx={{
              mt: 4,
              py: 1.8, // Taller button
              borderRadius: "16px",
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none", // Modern look: no uppercase
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 15px 25px -5px rgba(79, 70, 229, 0.5)",
                background: "linear-gradient(135deg, #4f46e5, #4338ca)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Save Profile
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile; 