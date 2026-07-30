import { useState, useEffect } from "react";
import { Link } from "react-router";
import ReminderCard from "../components/ReminderCard";

const API_URL = "http://localhost:3000";

// Getting Reminders from Neon
async function getReminders() {
  const response = await fetch(`${API_URL}/reminders`);

  if (!response.ok) {
    throw new Error("Could not load your reminders.");
  }

  const reminders = await response.json();
  return reminders;
}

function Home() {
  const [filter, setFilter] = useState("all");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   Loading Reminders
  useEffect(() => {
    async function loadReminders() {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadReminders();
  }, []);

  //   Calculating Active/Inactive counts
  const activeCount = reminders.filter(
    (reminder) =>
      reminder.isDone === false && new Date(reminder.dueDate) >= new Date(),
  ).length;
  const completedCount = reminders.filter(
    (reminder) => reminder.isDone === true,
  ).length;
  const overdueCount = reminders.filter(
    (reminder) =>
      reminder.isDone === false && new Date(reminder.dueDate) < new Date(),
  ).length;

  //   Filtering All/Active/Completed/Overdue
  let filteredReminders;
  if (filter === "active") {
    filteredReminders = reminders.filter(
      (reminder) =>
        reminder.isDone === false && new Date(reminder.dueDate) >= new Date(),
    );
  } else if (filter === "completed") {
    filteredReminders = reminders.filter(
      (reminder) => reminder.isDone === true,
    );
  } else if (filter === "overdue") {
    filteredReminders = reminders.filter(
      (reminder) =>
        reminder.isDone === false && new Date(reminder.dueDate) < new Date(),
    );
  } else {
    filteredReminders = reminders;
  }

  filteredReminders.sort(
    (firstReminder, secondReminder) =>
      new Date(firstReminder.dueDate) - new Date(secondReminder.dueDate),
  );

  return (
    <main className="page-container">
      {/* Top Header Section */}
      <section className="page-header">
        <div>
          <p className="eyebrow">Care schedule</p>
          <h1>Reminders</h1>
          <p>Keep track of active and completed care tasks for your pets.</p>
        </div>

        <Link className="button button-primary" to="/reminders/new">
          <span>+</span>
          New reminder
        </Link>
      </section>

      {/* Reminder Section */}
      <section className="content-panel">
        {/* Filter Bar with Filter Buttons */}
        <div className="filter-bar">
          <button
            className={filter === "all" ? "filter-btn active" : "filter-btn"}
            type="button"
            onClick={() => setFilter("all")}
          >
            All<span>{reminders.length}</span>
          </button>

          <button
            className={filter === "active" ? "filter-btn active" : "filter-btn"}
            type="button"
            onClick={() => setFilter("active")}
          >
            Active<span>{activeCount}</span>
          </button>

          <button
            className={
              filter === "completed" ? "filter-btn active" : "filter-btn"
            }
            type="button"
            onClick={() => setFilter("completed")}
          >
            Completed<span>{completedCount}</span>
          </button>

          <button
            className={
              filter === "overdue" ? "filter-btn active" : "filter-btn"
            }
            type="button"
            onClick={() => setFilter("overdue")}
          >
            Overdue<span>{overdueCount}</span>
          </button>
        </div>
        {/* Displaying */}
        {/* Loading */}
        {loading && <p>Loading reminders...</p>}

        {/* Error */}
        {error && <p className="alert">{error}</p>}

        {/* Empty State */}
        {!loading && !error && filteredReminders.length === 0 && (
          <div className="empty-state">
            <h2>No reminders</h2>
            <p>There are no reminders in this category.</p>
          </div>
        )}

        {/* Successful Loading */}
        {!loading && !error && filteredReminders.length > 0 && (
          <div className="reminder-list">
            {filteredReminders.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;

// import  { useState, useEffect } from "react";
// import { data, Link } from "react-router"
// import ReminderCard from "../components/ReminderCard"
// // import { Link, useNavigate, useParams } from "react-router";

// const API_URL = "http://localhost:3000"

// async function getHomeData(signal) {
//     const reminderResponse = await fetch(`${API_URL}/reminder`, { signal })
//     const petResponse = await fetch(`${API_URL}/pets`, { signal })

//     if (!reminderResponse.ok || !petResponse.ok) {
//         throw new Error("Could not load your reminders.")
//     }

//     const reminders = await reminderResponse.json()
//     const pets = await petResponse.json()

//     return { reminders, pets }
// }

// function Home() {
//         const [reminder, setReminders] = useState([]);
//         const [pet, setPets] = useState([])
//         const [loading, setLoading] = useState(true);
//         const [error, setError] = useState(null);

//         useEffect(() => {
//             const controller = new AbortController()

//             getHomeData(controller.signal)
//                 .then((data) => {
//                     setReminders(data.reminders)
//                     setPets(data.pets)
//                 })
//                 .catch((requestError) => {
//                     if(requestError.name !== "AbortError") {
//                         setError(requestError.message)
//                     }
//                 })
//                 .finally(() => {
//                     if(!controller.signal.aborted) {
//                         setLoading(false)
//                     }
//                 })
//             return() => controller.abort()
//         } , [])

//         async function fetchReminder() {
//             try {
//                 const response = await fetch("http://localhost:3000/reminder")
//                 console.log(response)
//                 if (!response.ok) {
//                     throw new Error(`Server responded with ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setReminder(data)
//             } catch (err) {
//                 setError(err.message)
//             } finally {
//                 setLoading(false);
//             }
//         }

//         async function fetchPet() {
//             try {
//                 const response = await fetch("http://localhost:3000/pets")
//                 console.log(response)
//                 if (!response.ok) {
//                     throw new Error(`Server responded with ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setPet(data)
//             } catch (err) {
//                 setError(err.message)
//             } finally {
//                 setLoading(false);
//             }
//         }

//     return (
//         <>
//         <Navbar/>
//         <div className="app">
//             <h1>Pet Care</h1>
//             <section className="card" >
//                 {loading && <p>Loading Reminder...</p>}
//                 {error && <p className="error">Error: {error}</p>}

//                 {!loading && !error && (
//                     <ul className="reminder-list">
//                         {reminder.length === 0 ? (
//                             <p>No reminder yet.</p>
//                         ) : (
//                             reminder.map((reminder) => (
//                                 <ReminderCard key={reminder.id} reminder={reminder} pet={pet}/>
//                             ))
//                         )}

//                     </ul>
//                 )}

//             </section>
//         </div>
//         </>
//     )
// }

// export default Home
