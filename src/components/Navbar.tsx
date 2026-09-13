import { Link, NavLink } from 'react-router-dom';
import { Home, Users } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-text">GFG PHCET</span>
        </Link>

        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Home size={15} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <Users size={15} />
            <span>Members</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
