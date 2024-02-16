import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const headerElement = document.getElementById("myHeader");
  useEffect(() => {
    const handleScroll = () => {
      if (headerElement) {
        const sticky = headerElement.offsetTop;
  
        if (window.pageYOffset > sticky) {
          setIsHeaderFixed(true);
        } else {
          setIsHeaderFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header ${isHeaderFixed ? "header--fixed" : ""}`}
      id="myHeader"
    >
      <div className="header__wrapper">
        <div className="container">
          <div className="row header__inner">
            <div className="col-6 col-md-2"></div>
            <div className="col-6 col-md-10">
              <div className="header__menu text-right">
                <Link
                  to="/visitor"
                  className="button__menu button button--icon button--small button--outline-primary"
                >
                  <span className="hide">Menu</span>
                  <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </div>
              <div className="header__navigation">
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
                        <Link to="/auth/signin" exact>Login</Link>
                      </li>
                    </ul>
                  </nav>
                  <ul className="header__mobile-cta">
                    <li>
                      <Link
                        to="/auth/signup"
                        className="button button--primary button--small"
                      >
                        Login
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
