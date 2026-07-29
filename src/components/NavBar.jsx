import { NavLink } from "react-router";

function Navbar () {
    return (
        <nav className="nav">
            <NavLink className="nav-item" to="/" end>Home</NavLink>
            <NavLink className="nav-item" to="/pets">Pets</NavLink>
            {/* <NavLink className="nev-item" to="/reminder">Reminder</NavLink> */}
            {/* <NavLink className="nav-item" to="/reminders/new" end>Add reminder</NavLink> */}
        </nav>
    )
}

export default Navbar