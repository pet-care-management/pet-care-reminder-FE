import { useState, useEffect } from "react";
import { Link } from "react-router";
import PetCard from "../components/PetCard";

const API_URL = "http://localhost:3000";

async function getPets() {
  const response = await fetch(`${API_URL}/pets`);

  if (!response.ok) {
    throw new Error("Could not load your pets.");
  }

  const pets = await response.json();
  return pets;
}

function Pets() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPets() {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPets();
  }, []);

  return (
    <main className="page-container">
      <section className="page-header">
        <div>
          <p className="eyebrow">Pet profiles</p>
          <h1>My Pets</h1>
          <p>View every pet you have added to your care list.</p>
        </div>

        <Link className="button button-primary" to="/pets/new">
          <span>+</span> Add Pet
        </Link>
      </section>

      {/* Pet details section */}
      <section className="content-panel">
        {loading && <p>Loading pets...</p>}

        {error && <p className="alert">{error}</p>}

        {/* EMPTY STATE CHECK */}
        {!loading && !error && pets.length === 0 && (
          <div className="empty-state">
            <h2>No pets added yet</h2>
            <p>Add your first pet to start creating care reminders.</p>
          </div>
        )}
        {/* Successful Loading */}
        {!loading && !error && pets.length > 0 && (
          <div className="pet-grid">
            {pets.map((pet) => (
              <PetCard key={pet.petId} pet={pet} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Pets;
