import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";

const API_URL = "http://localhost:3000";

export default function EditReminder() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    petId: "",
    task: "",
    dueDate: "",
    notes: "",
    // isDone: "",
  });
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    reminder();
    fetchPet();
  }, [id]);

  async function reminder() {
    try {
      const response = await fetch(`${API_URL}/reminders/${id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setForm({
        petId: data.petId,
        task: data.task,
        dueDate: data.dueDate?.slice(0, 16),
        notes: data.notes,
      });
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function fetchPet() {
    try {
      const response = await fetch(`${API_URL}/pets`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setPets(data);
      //   setForm({ ...form });
      //   console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.task) {
      setFormError("Task is required!!!");
      return;
    }
    setFormError("");

    try {
      console.log(form);
      const response = await fetch(`${API_URL}/reminders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      // setSelectedPetId(data)
      console.log(data);
      Navigate(`/`);
    } catch (err) {
      console.error("Failed to update reminder:", err);

      setFormError("Failed to update the reminder.");
    }
  }

  // function which will later gets passed on the onChange inside input field
  function onFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  }

  return (
    <>
      <section className="content-panel">
        <h2 className="page-header" style={{ justifyContent: "center" }}>
          Reminder For Your Pet 🐶
        </h2>

        <form className="reminder-form" onSubmit={handleSubmit}>
          {formError && <p className="error">{formError}</p>}

          <label htmlFor="pet-select">Choose a pet</label>
          <select
            className="input-item"
            name="petId"
            id="pet-select"
            value={form.petId}
            onChange={onFormChange}
          >
            {pets.map((pet) => (
              <option name="petId" key={pet.petId} value={pet.petId}>
                {" "}
                {pet.petName}
              </option>
            ))}
          </select>

          <label
            style={{
              display: "block",
              alignself: "flex-start",
              textAlign: "left",
            }}
          >
            Enter Task
          </label>
          <input
            type="text"
            name="task"
            className="input-item"
            placeholder="eg: take puppy for walk"
            value={form.task}
            onChange={onFormChange}
          />

          <label>Any Notes</label>
          <input
            type="text"
            name="notes"
            className="input-item"
            placeholder="Add any notes here"
            value={form.notes}
            onChange={onFormChange}
          />
          {/* <label>Status</label>
    <input 
    type="text"
    name="isDone"
    className="input-item"
    placeholder="Is it done?"
    value={form.isDone}
    onChange={onFormChange}
    /> */}

          {/*   built in method to create the calender drop down. type="date"> HTML attribute value - HTML | MDN */}
          {/* or both time and data <input type="datetime-local"> HTML attribute value - HTML | MDN */}
          <label>Date And Time</label>
          <input
            type="datetime-local"
            name="dueDate"
            className="input-item"
            placeholder="due"
            value={form.dueDate}
            onChange={onFormChange}
          />
          <button type="submit" className="button button-primary">
            Add Reminder
          </button>
        </form>
      </section>
    </>
  );
}
