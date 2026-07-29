import { NavLink } from "react-router"

function Navbar() {
    return (
        <header className="site-header">
            <NavLink className="brand" to="/" end aria-label="home">
                <span className="brand-mark" aria-hidden="true">P</span>
            </NavLink>

            <nav className="nav" aria-label="Main navigation">
                <NavLink className="nav-item" to="/" end>Home</NavLink>
                <NavLink className="nav-item" to="/pets">Pets</NavLink>
            </nav>
        </header>
    )
}

export default Navbar
