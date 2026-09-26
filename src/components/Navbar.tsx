import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    if (!mobileMenuOpen) return;
    setMenuClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setMenuClosing(false);
    }, 260);
  };

  const toggleMenu = () => {
    if (mobileMenuOpen) {
      closeMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  const trigger3DIntro = () => {
    window.dispatchEvent(new CustomEvent('replay-gfg-intro'));
  };

  return (
    <header className={`navbar-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar">
        {/* Brand with Official GFG Logo Badge */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-circle">
            <img
              src="/assets/gfg_phcet_logo_clean.png"
              alt="GFG PHCET"
              className="navbar-logo-img"
            />
          </div>
          <div className="navbar-brand-texts">
            <span className="navbar-brand-title">GFG PHCET</span>
            <span className="navbar-brand-tenure">2026-27</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links desktop-only">
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
            <span className="nav-member-badge">21</span>
          </NavLink>

          {/* 3D Intro Trigger */}
          <button
            type="button"
            onClick={trigger3DIntro}
            className="nav-3d-btn"
            title="Experience the Three.js 3D Chapter Intro Animation"
          >
            <Sparkles size={14} />
            <span>3D Intro</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger-icon${mobileMenuOpen ? ' open' : ''}`}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
        </button>
      </nav>

      {/* Mobile Drawer Menu – animated slide-down */}
      {(mobileMenuOpen || menuClosing) && (
        <div className={`mobile-nav-drawer${menuClosing ? ' closing' : ' opening'}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            onClick={closeMenu}
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            onClick={closeMenu}
          >
            <Users size={18} />
            <span>All 21 Team Members</span>
            <span className="nav-member-badge">21</span>
          </NavLink>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              trigger3DIntro();
            }}
            className="mobile-nav-link mobile-3d-btn"
          >
            <Sparkles size={18} />
            <span>Play 3D Starting Animation</span>
          </button>
        </div>
      )}
    </header>
  );
}
