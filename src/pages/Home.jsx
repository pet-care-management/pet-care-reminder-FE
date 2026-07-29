import  { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router";
import Navbar from "../components/NavBar"
import ReminderCard from "../components/ReminderCard"

function Home() {
        const [reminder, setReminder] = useState([]);
        const [pet, setPet] = useState([])
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            fetchReminder()
            fetchPet()
        }, [])   

        async function fetchReminder() {
            try {
                const response = await fetch("http://localhost:3000/reminder")
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                const data = await response.json();
                setReminder(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }

        async function fetchPet() {
            try {
                const response = await fetch("http://localhost:3000/pets")
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                const data = await response.json();
                setPet(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }

    return (
        <>
        <Navbar/>
        <div className="app">
            <h1>Pet Care</h1>
            <section className="card" >
                {loading && <p>Loading Reminder...</p>}
                {error && <p className="error">Error: {error}</p>}

                {!loading && !error && (
                    <ul className="reminder-list">
                        {reminder.length === 0 ? (
                            <p>No reminder yet.</p>
                        ) : (
                            reminder.map((reminder) => (
                                <ReminderCard key={reminder.id} reminder={reminder} pet={pet}/>
                            ))
                        )}

                    </ul>
                )}

            </section>
        </div>
        </>
    )
}


export default Home