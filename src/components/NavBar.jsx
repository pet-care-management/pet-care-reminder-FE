import { NavLink } from "react-router";

function Navbar () {
    return (
        <nav className="nav">
            <NavLink className="nav-item" to="/" >Home</NavLink>
            <NavLink className="nav-item" to="/reminders/new">Add reminder</NavLink>
        </nav>
    )
}