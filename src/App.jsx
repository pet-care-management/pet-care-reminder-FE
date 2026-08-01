import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import ReminderDetail from "./pages/ReminderDetail";
import AddReminder from "./pages/AddReminder";
import AddPet from "./pages/AddPet";
import PetReminderDetail from "./pages/PetReminderDetail";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reminders/:id" element={<ReminderDetail />} />
        {/* <Route path="/reminders/:id" element={<ReminderDetail/>} /> */}
        <Route path="/reminders/new" element={<AddReminder />} />
        {/* <Route path="/pets" element={<Pets />} /> */}
        {/* <Route path="/pets/new" element={<AddPet />} /> */}
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/new" element={<AddPet />} />
        <Route path="/pets/:id" element={<PetReminderDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="site-footer">
        <span className="brand-mark">P</span>
        <p>Thoughtful care, one reminder at a time.</p>
      </footer>
    </div>
  );
}

export default App;
