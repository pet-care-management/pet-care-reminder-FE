import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Navbar from "../components/Navbar";

export default function AddReminder() {
  const [form, setForm] = useState({
    petId: "",
    task: "",
    dueDate: null,
    notes: "",
  });
  const [pets, setPets] = useState([])

  useEffect(()=>{
    async function fetchPet() {
            try {
                const response = await fetch("http://localhost:3000/pets")
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                const data = await response.json();
                setPets(data)
                console.log(data)
            } catch (err) {
                console.error(err.message)
            } 
        }
    fetchPet()


  },[])
  // get all the pets in a useEffect
  // set them all to a state
  // use the select component 

  //function to create the reminder form

  return (
  <>
  <Navbar />
  <label htmlFor="pet-select">Choose a pet:</label>
    <select name="pets" id="pet-select">
        {pets.map((pet)=> 
            <option key={pet.petId} value={pet.petName}> {pet.petName}</option>
        )}
    </select>
  </>
  )
}

