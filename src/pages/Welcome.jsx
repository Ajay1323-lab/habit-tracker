import { Box, Button, Typography, Card, CardContent, Container, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@mui/system";
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
    Whatshot,
} from "@mui/icons-material";

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const habitCards = [
    { icon: <LocalDrink />, title: "Drink Water", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", streak: "7 days" },
    { icon: <DirectionsRun />, title: "Morning Run", bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "#fff", streak: "12 days" },
    { icon: <MenuBook />, title: "Read Book", bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "#fff", streak: "5 days" },
    { icon: <SelfImprovement />, title: "Meditate", bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", color: "#fff", streak: "30 days" },
    { icon: <FitnessCenter />, title: "Gym Workout", bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "#fff", streak: "21 days" },
    { icon: <SportsSoccer />, title: "Play Sports", bg: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", color: "#fff", streak: "3 days" },
];

const features = [
    {
        icon: <AutoAwesome sx={{ fontSize: 48 }} />,
        title: "Smart Tracking",
        desc: "Intelligent daily check-ins with reminders",
        color: "#667eea",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        icon: <TrendingUp sx={{ fontSize: 48 }} />,
        title: "Visual Analytics",
        desc: "Beautiful charts and insights",
        color: "#f5576c",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        icon: <EmojiEvents sx={{ fontSize: 48 }} />,
        title: "Achieve Goals",
        desc: "Unlock achievements and rewards",
        color: "#fee140",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
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
                pb: "80px",
            }}
        >
            {/* Animated Background Elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "-10%",
                    right: "-5%",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(246,224,94,0.2) 0%, transparent 70%)",
                    animation: `${float} 6s ease-in-out infinite`,
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "-10%",
                    left: "-5%",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    animation: `${float} 8s ease-in-out infinite`,
                    animationDelay: "1s",
                    zIndex: 1,
                }}
            />

            {/* Dark Mode Toggle */}
            <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}>
                <DarkModeToggle />
            </Box>

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pt: { xs: 8, md: 12 } }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 8,
                        animation: `${fadeInUp} 0.8s ease-out`,
                    }}
                >
                    {/* Badge */}
                    <Chip
                        icon={<Whatshot sx={{ color: "#FF6B6B !important" }} />}
                        label="🚀 Start your 30-day challenge"
                        sx={{
                            mb: 3,
                            px: 2,
                            py: 2.5,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(10px)",
                            border: "2px solid rgba(255,255,255,0.3)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            animation: `${pulse} 2s ease-in-out infinite`,
                            "& .MuiChip-label": { px: 1 },
                        }}
                    />

                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.8rem", md: "5rem" },
                            fontWeight: 900,
                            color: "#fff",
                            mb: 2,
                            lineHeight: 1.1,
                            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Build Better
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(135deg, #F6E05E 0%, #F5D042 100%, #F6E05E 200%)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                animation: `${shimmer} 3s linear infinite`,
                                display: "inline-block",
                            }}
                        >
                            Habits Daily
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: "1.1rem", md: "1.4rem" },
                            color: "rgba(255,255,255,0.95)",
                            mb: 5,
                            maxWidth: "650px",
                            mx: "auto",
                            lineHeight: 1.7,
                            fontWeight: 400,
                        }}
                    >
                        Track your progress, maintain streaks, and transform your life
                        <br />
                        <Box component="span" sx={{ fontWeight: 700 }}>
                            one habit at a time ✨
                        </Box>
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/today")}
                            sx={{
                                px: 6,
                                py: 2.5,
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                borderRadius: 4,
                                background: "linear-gradient(135deg, #F6E05E 0%, #F5D042 100%)",
                                color: "#2D3748",
                                textTransform: "none",
                                boxShadow: "0 12px 40px rgba(245,208,66,0.5)",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "relative",
                                overflow: "hidden",
                                "&:hover": {
                                    transform: "translateY(-6px) scale(1.02)",
                                    boxShadow: "0 20px 50px rgba(245,208,66,0.6)",
                                },
                                "&:before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: "-100%",
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                                    transition: "left 0.5s",
                                },
                                "&:hover:before": {
                                    left: "100%",
                                },
                            }}
                        >
                            Start Your Journey →
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/today")}
                            sx={{
                                px: 5,
                                py: 2.5,
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                borderRadius: 4,
                                border: "2px solid rgba(255,255,255,0.9)",
                                color: "#fff",
                                textTransform: "none",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    background: "rgba(255,255,255,0.15)",
                                    borderColor: "#fff",
                                    boxShadow: "0 12px 40px rgba(255,255,255,0.2)",
                                },
                            }}
                        >
                            Explore Habits
                        </Button>
                    </Box>
                </Box>

                {/* Horizontal Auto-Scrolling Carousel */}
                <Box sx={{ mb: 10, animation: `${fadeInUp} 0.8s ease-out 0.2s backwards` }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: { xs: "1.8rem", md: "2.5rem" },
                                mb: 1,
                                textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                            }}
                        >
                            Popular Habits 🔥
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.85)",
                                fontSize: "1.1rem",
                            }}
                        >
                            Join thousands building these habits
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            overflow: "hidden",
                            width: "100%",
                            position: "relative",
                            "&:before, &:after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                width: "100px",
                                height: "100%",
                                zIndex: 2,
                                pointerEvents: "none",
                            },
                            "&:before": {
                                left: 0,
                                background: "linear-gradient(to right, #667eea, transparent)",
                            },
                            "&:after": {
                                right: 0,
                                background: "linear-gradient(to left, #764ba2, transparent)",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 3,
                                width: "max-content",
                                animation: `${scrollLeft} 25s linear infinite`,
                                "&:hover": {
                                    animationPlayState: "paused",
                                },
                            }}
                        >
                            {habitCards.concat(habitCards).map((card, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        flex: "0 0 200px",
                                        height: "220px",
                                        borderRadius: 4,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: card.bg,
                                        color: card.color,
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                        border: "2px solid rgba(255,255,255,0.1)",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&:hover": {
                                            transform: "translateY(-12px) scale(1.05)",
                                            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                                            border: "2px solid rgba(255,255,255,0.3)",
                                        },
                                        "&:before": {
                                            content: '""',
                                            position: "absolute",
                                            top: "-50%",
                                            left: "-50%",
                                            width: "200%",
                                            height: "200%",
                                            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                                            opacity: 0,
                                            transition: "opacity 0.4s",
                                        },
                                        "&:hover:before": {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <Box sx={{ fontSize: 48, mb: 2, position: "relative", zIndex: 1 }}>
                                        {card.icon}
                                    </Box>
                                    <CardContent sx={{ textAlign: "center", pt: 0, pb: 2, position: "relative", zIndex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                            {card.title}
                                        </Typography>
                                        <Chip
                                            icon={<Whatshot sx={{ fontSize: 16, color: "#fff !important" }} />}
                                            label={card.streak}
                                            size="small"
                                            sx={{
                                                background: "rgba(255,255,255,0.25)",
                                                color: "#fff",
                                                fontWeight: 600,
                                                backdropFilter: "blur(10px)",
                                                fontSize: "0.75rem",
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Features Section */}
                <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.4s backwards` }}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#fff",
                            textAlign: "center",
                            mb: 5,
                            fontWeight: 800,
                            fontSize: { xs: "1.8rem", md: "2.5rem" },
                            textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        Why Choose Us? 💪
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                            gap: 4,
                        }}
                    >
                        {features.map((feature, index) => (
                            <Box
                                key={index}
                                sx={{
                                    background: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(20px)",
                                    borderRadius: 5,
                                    padding: 4,
                                    textAlign: "center",
                                    border: "2px solid rgba(255,255,255,0.2)",
                                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                    position: "relative",
                                    overflow: "hidden",
                                    "&:hover": {
                                        transform: "translateY(-10px)",
                                        background: "rgba(255,255,255,0.15)",
                                        borderColor: "rgba(255,255,255,0.4)",
                                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                                    },
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        background: feature.gradient,
                                        transform: "scaleX(0)",
                                        transformOrigin: "left",
                                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                    },
                                    "&:hover:before": {
                                        transform: "scaleX(1)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 80,
                                        height: 80,
                                        borderRadius: "50%",
                                        background: feature.gradient,
                                        color: "#fff",
                                        mb: 3,
                                        boxShadow: `0 8px 24px ${feature.color}40`,
                                        transition: "all 0.4s ease",
                                        "&:hover": {
                                            transform: "scale(1.1) rotate(5deg)",
                                        },
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        mb: 1.5,
                                        fontSize: "1.4rem",
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.85)",
                                        fontSize: "1rem",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {feature.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Final CTA */}
                <Box
                    sx={{
                        textAlign: "center",
                        mt: 10,
                        mb: 4,
                        animation: `${fadeInUp} 0.8s ease-out 0.6s backwards`,
                    }}
                >
                    <Box
                        sx={{
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(20px)",
                            borderRadius: 5,
                            padding: 5,
                            border: "2px solid rgba(255,255,255,0.2)",
                            maxWidth: "600px",
                            mx: "auto",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                mb: 2,
                                fontSize: { xs: "1.5rem", md: "2rem" },
                            }}
                        >
                            Ready to Transform Your Life? 🎯
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.9)",
                                fontSize: "1.1rem",
                                mb: 3,
                            }}
                        >
                            Join over 10,000+ people building better habits every day
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/today")}
                            sx={{
                                px: 6,
                                py: 2.5,
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                borderRadius: 4,
                                background: "#fff",
                                color: "#667eea",
                                textTransform: "none",
                                boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                    transform: "translateY(-4px) scale(1.05)",
                                    boxShadow: "0 15px 40px rgba(255,255,255,0.4)",
                                    background: "#fff",
                                },
                            }}
                        >
                            Get Started Free 🚀
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Welcome; 