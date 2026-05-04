import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Content from "./Content";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar" ref={navRef}>

      <div className="logo-container">
        <NavLink to="/" className="logo-text" onClick={closeMenu}>
          जनलोक प्रतिष्ठान संघटना
          <span className="logo-subtitle">JanLok Pratishthan</span>
        </NavLink>
      </div>

      {/* MENU ICON */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* NAV LINKS */}
      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/events" onClick={closeMenu}>
            Events
          </NavLink>
        </li>

        <li>
          <NavLink to="/news" onClick={closeMenu}>
            News
          </NavLink>
        </li>

        <li>
          <NavLink to="/downloads" onClick={closeMenu}>
            Downloads
          </NavLink>
        </li>

        <li>
          <NavLink to="/forms" onClick={closeMenu}>
            Forms
          </NavLink>
        </li>

        <li>
          <NavLink to="/videos" onClick={closeMenu}>
            Videos
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
        </li>

        <li>
         
          <NavLink to="/committee" onClick={closeMenu}>
            Committee
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin"
            className="admin-btn"
            onClick={closeMenu}
          >
            Admin
          </NavLink>
        </li>

        <li>
          <NavLink to="/contacts" onClick={closeMenu}>
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;



