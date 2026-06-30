import { Box, Typography } from "@mui/material";
import { useNotifications } from "../hooks/useNotifications";

export function AllNotificationsPage() {
  const { notifications, loading, error } =
    useNotifications(1, 100, "All");

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        All Notifications
      </Typography>

      {notifications.map((n) => (
        <Box
          key={n.ID}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="h6">
            {n.Type}
          </Typography>

          <Typography>
            {n.Message}
          </Typography>

          <Typography variant="caption">
            {n.Timestamp}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}