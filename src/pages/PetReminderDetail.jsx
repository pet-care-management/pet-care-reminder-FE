import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ReminderCard from "../components/ReminderCard";

function PetReminderDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchPet() {
      try {
        const response = await fetch(`http://localhost:3000/pets/${id}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Pet not found"
              : `Server responded with ${response.status}`,
          );
        }

        const data = await response.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPet();
  }, [id]);

  const reminders = pet?.reminders ?? [];
  const currentDate = new Date();

  const activeCount = reminders.filter(
    (reminder) =>
      reminder.isDone === false &&
      new Date(reminder.dueDate) >= currentDate,
  ).length;

  const completedCount = reminders.filter(
    (reminder) => reminder.isDone === true,
  ).length;

  const overdueCount = reminders.filter(
    (reminder) =>
      reminder.isDone === false &&
      new Date(reminder.dueDate) < currentDate,
  ).length;

  let filteredReminders;

  if (filter === "active") {
    filteredReminders = reminders.filter(
      (reminder) =>
        reminder.isDone === false &&
        new Date(reminder.dueDate) >= currentDate,
    );
  } else if (filter === "completed") {
    filteredReminders = reminders.filter(
      (reminder) => reminder.isDone === true,
    );
  } else if (filter === "overdue") {
    filteredReminders = reminders.filter(
      (reminder) =>
        reminder.isDone === false &&
        new Date(reminder.dueDate) < currentDate,
    );
  } else {
    filteredReminders = reminders;
  }

  const sortedReminders = [...filteredReminders].sort(
    (firstReminder, secondReminder) =>
      new Date(firstReminder.dueDate) - new Date(secondReminder.dueDate),
  );

  return (
    <main className="page-container">
      <Link className="back-link" to="/pets">
        ← Back to pets
      </Link>

      {loading && <p>Loading pet reminders...</p>}
      {error && <p className="alert">{error}</p>}

      {!loading && !error && pet && (
        <>
          <section className="page-header">
            <div>
              <p className="eyebrow">Pet care schedule</p>
              <h1>Reminders for {pet.petName}</h1>
              <p>View active, completed, and overdue care tasks for this pet.</p>
            </div>
          </section>

          <section className="content-panel">
            <div className="filter-bar">
              <button
                className={filter === "all" ? "filter-btn active" : "filter-btn"}
                type="button"
                onClick={() => setFilter("all")}
              >
                All <span>{reminders.length}</span>
              </button>

              <button
                className={
                  filter === "active" ? "filter-btn active" : "filter-btn"
                }
                type="button"
                onClick={() => setFilter("active")}
              >
                Active <span>{activeCount}</span>
              </button>

              <button
                className={
                  filter === "completed" ? "filter-btn active" : "filter-btn"
                }
                type="button"
                onClick={() => setFilter("completed")}
              >
                Completed <span>{completedCount}</span>
              </button>

              <button
                className={
                  filter === "overdue" ? "filter-btn active" : "filter-btn"
                }
                type="button"
                onClick={() => setFilter("overdue")}
              >
                Overdue <span>{overdueCount}</span>
              </button>
            </div>
            {sortedReminders.length === 0 ? (
            <div className="empty-state">
                <h2>No reminders</h2>
                <p>There are no reminders in this category.</p>
            </div>
            ) : (
            <div className="reminder-list">
                {sortedReminders.map((reminder) => (
                <ReminderCard
                    key={reminder.id}
                    reminder={{ ...reminder, pet }}
                />
                ))}
            </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default PetReminderDetail;
