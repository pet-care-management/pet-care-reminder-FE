import React from "react";
import { Routes, Route } from "react-router"
import Navbar from "./components/NavBar";
import Home from "./pages/Home";


function App() {
  return (
    <>
    {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/reminders/:id" element={<ReminderDetail />}/> */}
        {/* <Route path="/reminders/:id" element={<ReminderDetail/>} />
        <Route path="/reminders/new" element={<AddReminder />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/new" element={<AddPet />} /> */}
      </Routes>
    
    </>
    
  )
}

export default App