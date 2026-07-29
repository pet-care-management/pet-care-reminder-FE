import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router"
import ReminderCard from "../components/ReminderCard"

const API_URL = "http://localhost:3000"

async function getHomeData(signal) {
    const [reminderResponse, petResponse] = await Promise.all([
        fetch(`${API_URL}/reminder`, { signal }),
        fetch(`${API_URL}/pets`, { signal })
    ])

    if (!reminderResponse.ok || !petResponse.ok) {
        throw new Error("Could not load your reminders.")
    }

    const [reminders, pets] = await Promise.all([
        reminderResponse.json(),
        petResponse.json()
    ])

    return { reminders, pets }
}

function Home() {
    const [reminders, setReminders] = useState([])
    const [pets, setPets] = useState([])
    const [filter, setFilter] = useState("all")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        getHomeData(controller.signal)
            .then((data) => {
                setReminders(data.reminders)
                setPets(data.pets)
            })
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

    const petsById = useMemo(
        () => Object.fromEntries(pets.map((pet) => [pet.petId, pet])),
        [pets]
    )

    const filteredReminders = useMemo(() => {
        const sorted = [...reminders].sort(
            (first, second) => new Date(first.dueDate) - new Date(second.dueDate)
        )

        if (filter === "active") {
            return sorted.filter((reminder) => !reminder.isDone)
        }

        if (filter === "inactive") {
            return sorted.filter((reminder) => reminder.isDone)
        }

        return sorted
    }, [filter, reminders])

    const activeCount = reminders.filter((reminder) => !reminder.isDone).length
    const inactiveCount = reminders.filter((reminder) => reminder.isDone).length

    const handleDelete = async (id) => {
        setDeletingId(id)

        try {
            const response = await fetch(`${API_URL}/reminder/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                throw new Error("Could not delete that reminder.")
            }

            setReminders((currentReminders) =>
                currentReminders.filter((reminder) => reminder.id !== id)
            )
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <main className="page-container">
            <section className="page-header">
                <div>
                    <p className="eyebrow">Care schedule</p>
                    <h1>Reminders</h1>
                    <p>Keep track of active and completed care tasks for your pets.</p>
                </div>
                <Link className="button button-primary" to="/reminders/new">
                    <span aria-hidden="true">+</span>
                    New reminder
                </Link>
            </section>

            <section className="content-panel">
                <div className="filter-bar" aria-label="Filter reminders">
                    <button
                        className={filter === "all" ? "filter-button active" : "filter-button"}
                        type="button"
                        onClick={() => setFilter("all")}
                    >
                        All <span>{reminders.length}</span>
                    </button>
                    <button
                        className={filter === "active" ? "filter-button active" : "filter-button"}
                        type="button"
                        onClick={() => setFilter("active")}
                    >
                        Active <span>{activeCount}</span>
                    </button>
                    <button
                        className={filter === "inactive" ? "filter-button active" : "filter-button"}
                        type="button"
                        onClick={() => setFilter("inactive")}
                    >
                        Inactive <span>{inactiveCount}</span>
                    </button>
                </div>

                {error && <p className="alert" role="alert">{error}</p>}

                {loading ? (
                    <div className="loading-list" aria-label="Loading reminders">
                        <div className="skeleton" />
                        <div className="skeleton" />
                    </div>
                ) : filteredReminders.length === 0 ? (
                    <div className="empty-state">
                        <span aria-hidden="true">✓</span>
                        <h2>No {filter === "all" ? "" : filter} reminders</h2>
                        <p>
                            {reminders.length === 0
                                ? "Create your first reminder to begin tracking pet care."
                                : "There are no reminders in this category."}
                        </p>
                    </div>
                ) : (
                    <div className="reminder-list">
                        {filteredReminders.map((reminder) => (
                            <ReminderCard
                                key={reminder.id}
                                reminder={reminder}
                                pet={petsById[reminder.petId]}
                                onDelete={handleDelete}
                                isDeleting={deletingId === reminder.id}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default Home
