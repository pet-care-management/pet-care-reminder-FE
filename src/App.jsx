import { Navigate, Route, Routes } from "react-router"
import Navbar from "./components/NavBar"
import AddPet from "./pages/AddPet"
import AddReminder from "./pages/AddReminder"
import Home from "./pages/Home"
import Pets from "./pages/Pets"

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/new" element={<AddPet />} />
        <Route path="/reminders/new" element={<AddReminder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="site-footer">
        <span>Pet Care</span>
        <p>Thoughtful care, one reminder at a time.</p>
      </footer>
    </div>
  )
}

export default App
