import { NavLink } from "react-router";

function Navbar () {
    return (
        <header className="site-header">
            <NavLink className="brand" to="/" end>
                <span className="brand-mark">P</span>
            </NavLink>

            <nav className="nav">
                <NavLink className="nav-item" to="/" end>Home</NavLink>
                <NavLink className="nav-item" to="/pets" end>Pets</NavLink>
            </nav>
        </header>
    )
}

export default Navbar
