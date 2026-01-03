import { Box, Button, Typography, Card, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/common/DarkModeToggle";
import {
    FitnessCenter,
    MenuBook,
    LocalDrink,
    SelfImprovement,
    SportsSoccer,
    DirectionsRun,
    AutoAwesome,
    TrendingUp,
    EmojiEvents,
} from "@mui/icons-material";

const habitCards = [
    { icon: <LocalDrink />, title: "Drink Water", bg: "#E3F2FD", color: "#1976D2" },
    { icon: <DirectionsRun />, title: "Morning Run", bg: "#FCE4EC", color: "#C2185B" },
    { icon: <MenuBook />, title: "Read Book", bg: "#FFF3E0", color: "#F57C00" },
    { icon: <SelfImprovement />, title: "Meditate", bg: "#F3E5F5", color: "#7B1FA2" },
    { icon: <FitnessCenter />, title: "Gym Workout", bg: "#FFEBEE", color: "#D32F2F" },
    { icon: <SportsSoccer />, title: "Play Sports", bg: "#E8F5E9", color: "#388E3C" },
];

const features = [
    {
        icon: <AutoAwesome sx={{ fontSize: 40 }} />,
        title: "Simple Tracking",
        desc: "Easy daily check-ins",
        color: "#667eea"
    },
    {
        icon: <TrendingUp sx={{ fontSize: 40 }} />,
        title: "Visual Progress",
        desc: "See your growth",
        color: "#F6E05E"
    },
    {
        icon: <EmojiEvents sx={{ fontSize: 40 }} />,
        title: "Build Streaks",
        desc: "Stay consistent",
        color: "#FF6B6B"
    },
];

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "hidden",
                pb: "80px", // Add padding for bottom nav
            }}
        >
            {/* Dark Mode Toggle */}
            <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}>
                <DarkModeToggle />
            </Box>

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pt: 12 }}>
                {/* Hero Section */}
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.5rem", md: "4rem" },
                            fontWeight: 800,
                            color: "#fff",
                            mb: 2,
                            lineHeight: 1.1,
                            textShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        Build Better
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(135deg, #F6E05E 0%, #F5D042 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Habits Daily
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "1rem", md: "1.3rem" },
                            color: "rgba(255,255,255,0.9)",
                            mb: 4,
                            maxWidth: "600px",
                            mx: "auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Track your progress, maintain streaks, and transform your life one habit at a time
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/today")}
                        sx={{
                            px: 6,
                            py: 2.5,
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            borderRadius: 3,
                            background: "linear-gradient(135deg, #F6E05E 0%, #F5D042 100%)",
                            color: "#2D3748",
                            textTransform: "none",
                            boxShadow: "0 10px 30px rgba(245,208,66,0.4)",
                            transition: "all 0.3s ease",
                            "&:hover": { transform: "translateY(-4px)", boxShadow: "0 15px 40px rgba(245,208,66,0.5)" },
                        }}
                    >
                        Start Your Journey →
                    </Button>
                </Box>


                {/* Horizontal Auto-Scrolling Carousel for Habit Cards */}
                <Box sx={{ mb: 8 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#fff",
                            textAlign: "center",
                            mb: 3,
                            fontWeight: 700,
                            fontSize: { xs: "1.5rem", md: "2rem" },
                        }}
                    >
                        Popular Habits
                    </Typography>

                    <Box
                        sx={{
                            overflow: "hidden",
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                width: "max-content",
                                animation: "scroll-right 20s linear infinite",
                            }}
                        >
                            {habitCards.concat(habitCards).map((card, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        flex: "0 0 120px", // fixed size
                                        borderRadius: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: card.bg,
                                        color: card.color,
                                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                        cursor: "pointer",
                                        border: "2px solid transparent",
                                        "&:hover": { transform: "translateY(-4px) scale(1.05)", border: `2px solid ${card.color}` },
                                    }}
                                >
                                    <Box sx={{ fontSize: 36, mb: 1 }}>{card.icon}</Box>
                                    <CardContent sx={{ textAlign: "center", pt: 0, pb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                                            {card.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>

                    {/* CSS Animation */}
                    <style>
                        {`
      @keyframes scroll-right {
        0% { transform: translateX(-50%); } 
        100% { transform: translateX(0); } /* moves left → right */
      }
    `}
                    </style>
                </Box>



                {/* Features Section */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 3,
                        mt: 4,
                    }}
                >
                    {features.map((feature, index) => (
                        <Box
                            key={index}
                            sx={{
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(20px)",
                                borderRadius: 4,
                                padding: 3,
                                textAlign: "center",
                                border: "1px solid rgba(255,255,255,0.2)",
                                transition: "all 0.3s ease",
                                "&:hover": { transform: "translateY(-5px)", background: "rgba(255,255,255,0.15)" },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${feature.color}40, ${feature.color}20)`,
                                    color: "#fff",
                                    mb: 1,
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}>
                                {feature.title}
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>
                                {feature.desc}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Welcome;
