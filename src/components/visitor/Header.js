import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const sticky = headerRef.current.offsetTop;
      setIsHeaderFixed(window.pageYOffset > sticky);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${isMenuOpen ? "is-open" : ""} ${
        isHeaderFixed ? "header--fixed" : ""
      }`}
      ref={headerRef}
    >
      <div className="header__wrapper">
        <div className="container">
          <div className="row header__inner">
            <div className="col-6 col-md-2"></div>
            <div className="col-6 col-md-10">
              <div className="header__menu text-right">
                <div
                  className="button__menu button button--icon button--small button--outline-primary"
                  onClick={toggleMenu}
                >
                  <span className="hide">Menu</span>
                  <div className={`hamburger ${isMenuOpen ? "is-active" : ""}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div
                className={`header__navigation ${isMenuOpen ? "is-open" : ""}`}
              >
                <div className="header__navigation-wrapper">
                  <nav>
                    <ul className="header__navigation-main">
                      <li>
                        <Link to="/visitor">Help</Link>
                      </li>
                      <li>
                        <Link to="/visitor">About us</Link>
                      </li>
                      <li className="link-hr">
                        <Link to="/auth/signin">Login</Link>
                      </li>
                    </ul>
                  </nav>
                  <ul className="header__mobile-cta">
                    <li>
                      <Link
                        to="/auth/signup"
                        className="button button--primary button--small"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
