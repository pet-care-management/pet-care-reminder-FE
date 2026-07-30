import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import ReminderDetail from "./pages/ReminderDetail";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reminder/:id" element={<ReminderDetail />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
