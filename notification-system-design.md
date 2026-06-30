# Notification System Design

## Stage 1 - Priority Inbox

### Objective

The goal of this stage is to fetch notifications from the given API and display the most important ones first. Priority is based on notification type and timestamp.

---

## Tech Stack

- React (Vite)
- JavaScript
- Material UI
- Axios

---

## Project Structure

- `api/` – API calls
- `middleware/` – Logging function
- `hooks/` – Fetch and manage notifications
- `components/` – Filter component
- `pages/` – Main notifications page

---

## Working

1. Fetch notifications from the protected API.
2. Log important events using the logging middleware.
3. Filter notifications by category (All, Placement, Result, Event).
4. Sort notifications by:
   - Placement
   - Result
   - Event
5. If two notifications have the same priority, the latest one is shown first.
6. Display only the top 10 notifications.

---

## APIs Used

- POST `/auth` – Generate access token
- GET `/notifications` – Fetch notifications
- POST `/logs` – Store logs

---

## Error Handling

- Show loading indicator while fetching data.
- Display an error message if the request fails.
- Show a message if no notifications are available.

---

## Future Improvements

- Read/Unread notifications
- Search notifications
- Real-time updates
- Better pagination
- Notification caching