import axios from "axios";
import { Log } from "../middleware/logger";

const BASE_URL = "http://4.224.186.213/evaluation-service";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzAzMDUxMDUwMjUxQHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc4MjgxMjk2MSwiaWF0IjoxNzgyODEyMDYxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjEyN2Y0ZmYtMDQzMi00YmRjLWI2YmItMzc5MGZmNjU2NDRmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZHdlZXAgYmFyaXlhIiwic3ViIjoiNTgxMzlkN2EtOWY2OS00ZjM1LWJlZjktYmY3NjVlNDQ4NzhlIn0sImVtYWlsIjoiMjMwMzA1MTA1MDI1MUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoiZHdlZXAgYmFyaXlhIiwicm9sbE5vIjoiMjMwMzA1MTA1MDI1MSIsImFjY2Vzc0NvZGUiOiJjSnFhRUIiLCJjbGllbnRJRCI6IjU4MTM5ZDdhLTlmNjktNGYzNS1iZWY5LWJmNzY1ZTQ0ODc4ZSIsImNsaWVudFNlY3JldCI6Imt5emZYeURWYkt2YkFxZGIifQ.nxdjl5TxmYSVreUg8RiP0IkQWKiaK6aK1Olpi2fZRT0";

export async function getNotifications(
  page = 1,
  limit = 10,
  type = ""
) {
  await Log(
    "frontend",
    "info",
    "api",
    "Fetching notifications from server"
  );

  try {
    const response = await axios.get(
      `${BASE_URL}/notifications`,
      {
        params: {
          page,
          limit,
          notification_type: type || undefined,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return response.data.notifications;
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      error.response?.data?.message || error.message
    );

    return [];
  }
}