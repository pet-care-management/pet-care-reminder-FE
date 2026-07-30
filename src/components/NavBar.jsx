import { NavLink } from "react-router";

function Navbar() {
  // the above code is for the remidner page to have the HOME on the navbar highlighted when making and checking reminders
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" end>
        <span className="brand-mark">P</span>
      </NavLink>

      <nav className="nav">
        <NavLink className="nav-item" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-item" to="/pets" end>
          {/* maybe remove the end above since when making a new pet page loads, pets wont be highlighted */}
          Pets
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
