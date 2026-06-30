import { Routes, Route } from "react-router-dom";

import { NotificationsPage } from "./pages/NotificationsPage";
import { AllNotificationsPage } from "./pages/AllNotificationsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NotificationsPage />} />
      <Route path="/all" element={<AllNotificationsPage />} />
    </Routes>
  );
}

export default App;