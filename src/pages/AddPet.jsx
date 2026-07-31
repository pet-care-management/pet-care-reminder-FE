import { useState } from "react";
import { Link, useNavigate } from "react-router";

const API_URL = "http://localhost:3000";

function AddPet() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const newPet = {
      petName: form.elements.petName.value,
      species: form.elements.species.value,
      breed: form.elements.breed.value,
      notes: form.elements.notes.value,
    };

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/pets/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPet),
      });

      if (!response.ok) {
        throw new Error("Could not add the pet.");
      }

      const savedPet = await response.json();
      console.log("Saved pet:", savedPet);

      navigate("/pets");
    } catch (requestError) {
      console.error(requestError);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="form-page">
      <Link className="back-link" to="/pets">
        ← Back to pets
      </Link>

      <section className="form-card">
        <p className="eyebrow">New pet profile</p>
        <h1>Add a pet</h1>
        <p className="form-intro">
          Enter the basic information you want to remember.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Pet name
              <input
                type="text"
                name="petName"
                placeholder="e.g. Milo"
                required
              />
            </label>

            <label>
              Species
              <input
                type="text"
                name="species"
                placeholder="e.g. Dog"
                required
              />
            </label>
          </div>

          <label>
            <span>
              Breed <span className="optional">(optional)</span>
            </span>
            <input type="text" name="breed" placeholder="e.g. Labrador mix" />
          </label>

          <label>
            <span>
              Notes <span className="optional">(optional)</span>
            </span>
            <textarea
              name="notes"
              rows="4"
              placeholder="Allergies or vet notes..."
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <Link className="button button-ghost" to="/pets">
              Cancel
            </Link>
            <button
              className="button button-primary"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Add pet"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddPet;
