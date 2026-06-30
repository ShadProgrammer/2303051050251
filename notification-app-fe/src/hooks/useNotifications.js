import { useState, useEffect } from "react";
import { getNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const total = notifications.length;
  const totalPages = 1;

  return {
    notifications,
    total,
    totalPages,
    loading,
    error,
  };
}
