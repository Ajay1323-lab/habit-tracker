import { Card, CardContent, Typography } from "@mui/material";

const StreakCard = ({ title, value }) => (
  <Card sx={{ flex: 1 }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default StreakCard;
