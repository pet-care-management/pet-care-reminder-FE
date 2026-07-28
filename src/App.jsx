import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reminders/:id" element={<ReminderDetail/>} />
        <Route path="/reminders/new" element={<AddReminder />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/new" element={<AddPet />} />
      </Routes>
    </>
  )
}