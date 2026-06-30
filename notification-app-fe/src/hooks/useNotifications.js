import { useState, useEffect } from "react";
import { getNotifications } from "../api/notifications";

export function useNotifications(page, limit, filter) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const data = await getNotifications(
          page,
          limit,
          filter === "All" ? "" : filter,
        );

        setNotifications(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, limit, filter]);

  const total = notifications.length;
  const totalPages = Math.ceil(total / limit);

  return {
    notifications,
    total,
    totalPages,
    loading,
    error,
  };
}
