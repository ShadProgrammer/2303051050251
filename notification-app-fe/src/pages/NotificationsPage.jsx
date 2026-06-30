import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material";

import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

// import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [, forceUpdate] = useState(0);

  const limit = 10;
  const { notifications, totalPages, loading, error } = useNotifications(
    page,
    limit,
    filter,
  );

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  const priority = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const priorityDiff = priority[b.Type] - priority[a.Type];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const start = (page - 1) * limit;
  const end = start + limit;

  const topNotifications = sortedNotifications.slice(start, end);

  const unreadCount = 2;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

const markAsViewed = (id) => {
  const viewed =
    JSON.parse(localStorage.getItem("viewed")) || [];

  if (!viewed.includes(id)) {
    viewed.push(id);

    localStorage.setItem(
      "viewed",
      JSON.stringify(viewed)
    );
  }

  forceUpdate((v) => v + 1);
};

  const viewedNotifications = JSON.parse(localStorage.getItem("viewed")) || [];

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && notifications.length == 0 && (
        <Alert severity="info">No notification found.</Alert>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={1.5}>
          {topNotifications.map((n) => (
            <Box
              onClick={() => markAsViewed(n.ID)}
              key={n.ID}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6">{n.Type}</Typography>

              <Typography
                variant="caption"
                color={
                  viewedNotifications.includes(n.ID)
                    ? "text.secondary"
                    : "primary"
                }
              >
                {viewedNotifications.includes(n.ID) ? "Viewed" : "New"}
              </Typography>

              <Typography>{n.Message}</Typography>

              <Typography variant="caption">{n.Timestamp}</Typography>
            </Box>
          ))}
        </Stack>
      )}

      {!loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
