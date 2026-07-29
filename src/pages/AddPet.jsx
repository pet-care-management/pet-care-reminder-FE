import { Link, useNavigate } from "react-router"
import { useState } from "react"

const API_URL = "http://localhost:3000"

function AddPet() {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setSubmitting(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/pets/new`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    petName: formData.get("petName"),
                    species: formData.get("species"),
                    breed: formData.get("breed"),
                    notes: formData.get("notes")
                })
            })

            if (!response.ok) {
                throw new Error("Could not add the pet. Check the required fields.")
            }

            navigate("/pets")
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="form-page">
            <Link className="back-link" to="/pets">← Back to pets</Link>

            <section className="form-card">
                <p className="eyebrow">New pet profile</p>
                <h1>Add a pet</h1>
                <p className="form-intro">Enter the basic information you want to remember.</p>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>
                            Pet name
                            <input name="petName" placeholder="e.g. Milo" required />
                        </label>
                        <label>
                            Species
                            <input name="species" placeholder="e.g. Dog" required />
                        </label>
                    </div>
                    <label>
                        Breed <span className="optional">(optional)</span>
                        <input name="breed" placeholder="e.g. Labrador mix" />
                    </label>
                    <label>
                        Notes <span className="optional">(optional)</span>
                        <textarea name="notes" rows="4" placeholder="Allergies or care notes…" />
                    </label>

                    {error && <p className="form-error" role="alert">{error}</p>}

                    <div className="form-actions">
                        <Link className="button button-ghost" to="/pets">Cancel</Link>
                        <button className="button button-primary" type="submit" disabled={submitting}>
                            {submitting ? "Saving…" : "Add pet"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default AddPet
