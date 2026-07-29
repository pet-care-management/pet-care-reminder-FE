import { useEffect, useState } from "react"
import { Link } from "react-router"
import PetCard from "../components/PetCard"

const API_URL = "http://localhost:3000"

function Pets() {
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(true)
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
                    setLoading(false)
                }
            })

        return () => controller.abort()
    }, [])

    return (
        <main className="page-container">
            <section className="page-header">
                <div>
                    <p className="eyebrow">Pet profiles</p>
                    <h1>My pets</h1>
                    <p>View every pet you have added to your care list.</p>
                </div>
                <Link className="button button-primary" to="/pets/new">
                    <span aria-hidden="true">+</span>
                    Add pet
                </Link>
            </section>

            <section className="content-panel">
                {error && <p className="alert" role="alert">{error}</p>}

                {loading ? (
                    <div className="pet-grid" aria-label="Loading pets">
                        <div className="skeleton pet-skeleton" />
                        <div className="skeleton pet-skeleton" />
                    </div>
                ) : pets.length === 0 ? (
                    <div className="empty-state">
                        <span aria-hidden="true">🐾</span>
                        <h2>No pets added yet</h2>
                        <p>Add your first pet to start creating care reminders.</p>
                    </div>
                ) : (
                    <div className="pet-grid">
                        {pets.map((pet) => <PetCard key={pet.petId} pet={pet} />)}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Pets
