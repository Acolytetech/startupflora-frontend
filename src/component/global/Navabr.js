import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import createClient from "../../Client";
import "./Navbar.css";

const Navbar = ({ navRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarData, setNavbarData] = useState(null);
  const [error, setError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 950);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch navbar data from Sanity
  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "navbar"][0] {
          brand,
          logo {
            asset -> { url }
          },
          menuItems[] {
            label,
            link,
            dropdownItems[] {
              label,
              link,
              subdropdownItems[] {
                label,
                link
              }
            }
          },
          ctaButton {
            label,
            link
          }
        }`
      )
      .then((data) => setNavbarData(data))
      .catch(() => setError(true));
  }, []);

  // Loading and error handling
  if (error) {
    return <div className="error">Failed to load navbar data</div>;
  }

  if (!navbarData) {
    return <div className="loading">Loading...</div>;
  }

  // Recursive dropdown rendering
  const renderDropdownMenu = (items, label) => {
    const dropdownClass = label.toLowerCase().replace(/\s+/g, "-"); // Converts "Startup India" to "startup-india"
    return (
      <ul className={`dropdown-menu ${dropdownClass}`} role="menu">
        {items.map((item, index) => (
          <li key={index} className="dropdown-item" role="none">
            <Link
              to={item.link || "#"}
              className="dropdown-link"
              role="menuitem"
              tabIndex={0}
            >
              {item.label}
            </Link>
            {/* Render sub-dropdown if present */}
            {item.subdropdownItems && (
              <ul className="sub-dropdown-menu" role="menu">
                {item.subdropdownItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sub-dropdown-item" role="none">
                    <Link
                      to={subItem.link || "#"}
                      className="sub-dropdown-link"
                      role="menuitem"
                      tabIndex={0}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} ref={navRef}>
      {/* Logo and Brand */}
      <div className="logo">
        {navbarData.logo && (
          <img
            src={navbarData.logo.asset.url}
            alt={navbarData.brand}
            className="logo-image"
          />
        )}
        {navbarData.brand && (
          <span className="brand-name">{navbarData.brand}</span>
        )}
      </div>

      {/* Hamburger Icon for mobile */}
      <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar links */}
      <ul className={`navlinks ${isMenuOpen ? "open" : ""}`}>
        {navbarData.menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.link || "#"} className="nav-link">
              {item.label}
            </Link>
            {/* Render dropdown with unique class */}
            {item.dropdownItems &&
              renderDropdownMenu(item.dropdownItems, item.label)}
          </li>
        ))}
        {navbarData.ctaButton && (
          <li className="cta-container">
            <Link
              className="btn-grad"
              to={
                navbarData.ctaButton.link ||
                "https://www.startupflora.com/contact-us"
              }
            >
              Contact Us
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
