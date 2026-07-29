import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

const API_URL = "http://localhost:3000"

function AddReminder() {
    const navigate = useNavigate()
    const [pets, setPets] = useState([])
    const [loadingPets, setLoadingPets] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        fetch(`${API_URL}/pets`, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load your pets.")
                }
                return response.json()
            })
            .then(setPets)
            .catch((requestError) => {
                if (requestError.name !== "AbortError") {
                    setError(requestError.message)
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoadingPets(false)
                }
            })

        return () => controller.abort()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        setSubmitting(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}/reminder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    petId: Number(formData.get("petId")),
                    task: formData.get("task"),
                    notes: formData.get("notes"),
                    dueDate: new Date(formData.get("dueDate")).toISOString(),
                    isDone: false
                })
            })

            if (!response.ok) {
                throw new Error("Could not add the reminder. Check the required fields.")
            }

            navigate("/")
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="form-page">
            <Link className="back-link" to="/">← Back to reminders</Link>

            <section className="form-card">
                <p className="eyebrow">New care task</p>
                <h1>Add a reminder</h1>
                <p className="form-intro">Choose a pet and enter the care task details.</p>

                {!loadingPets && pets.length === 0 ? (
                    <div className="form-empty">
                        <span aria-hidden="true">🐾</span>
                        <h2>Add a pet first</h2>
                        <p>A reminder must belong to a pet.</p>
                        <Link className="button button-primary" to="/pets/new">Add pet</Link>
                    </div>
                ) : (
                    <form className="form" onSubmit={handleSubmit}>
                        <label>
                            Pet
                            <select name="petId" defaultValue="" required disabled={loadingPets}>
                                <option value="" disabled>
                                    {loadingPets ? "Loading pets…" : "Select a pet"}
                                </option>
                                {pets.map((pet) => (
                                    <option key={pet.petId} value={pet.petId}>{pet.petName}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Task
                            <input name="task" placeholder="e.g. Evening walk" required />
                        </label>
                        <label>
                            Due date and time
                            <input name="dueDate" type="datetime-local" required />
                        </label>
                        <label>
                            Notes <span className="optional">(optional)</span>
                            <textarea name="notes" rows="4" placeholder="Anything helpful to remember…" />
                        </label>

                        {error && <p className="form-error" role="alert">{error}</p>}

                        <div className="form-actions">
                            <Link className="button button-ghost" to="/">Cancel</Link>
                            <button
                                className="button button-primary"
                                type="submit"
                                disabled={submitting || loadingPets}
                            >
                                {submitting ? "Saving…" : "Add reminder"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    )
}

export default AddReminder
