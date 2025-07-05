// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyBrand</Link>
      </div>

      <div className={`navbar-links ${open ? 'active' : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/issue" onClick={() => setOpen(false)}>Issue</Link>
        <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
