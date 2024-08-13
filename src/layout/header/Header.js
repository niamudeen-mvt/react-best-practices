import React, { useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FiLogOut } from "react-icons/fi";
import "./header.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useWindowSize from "../../hooks/useWindowSize";

const Header = () => {
  const { userId, logout, cartList } = useLocalStorage();

  const navRef = useRef();
  const windowSize = useWindowSize();
  const routeName = useLocation().pathname;

  const handleNavClick = () => {
    if (navRef.current) {
      navRef.current.classList.remove("show");
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      data-bs-theme="light"
      sticky="top"
      className="py-3"
    >
      <Container>
        <Navbar.Brand to="#home" className="fw-medium">
          ECOM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" ref={navRef}>
          <Nav
            className={`ms-auto  flexCenter ${
              windowSize.width < 992 ? "min-vh-100" : ""
            }`}
          >
            <div
              className={`d-flex gap-3  ${
                windowSize.width < 992 ? "flex-column" : ""
              }`}
            >
              {/* <Link to="/test" onClick={handleNavClick}>
                <button
                  className={`btn  w-100 py-2 px-3 ${
                    routeName === "/" ? "btn-dark" : "btn-outline-dark"
                  }`}
                >
                  Test
                </button>
              </Link> */}
              <Link to="/" onClick={handleNavClick}>
                <button
                  className={`btn  w-100 py-2 px-3 ${
                    routeName === "/" ? "btn-dark" : "btn-outline-dark"
                  }`}
                >
                  HOME
                </button>
              </Link>

              {userId === null ? (
                <>
                  <Link to="/signup" onClick={handleNavClick}>
                    <button
                      className={`btn  w-100 py-2 px-3 ${
                        routeName === "/signup"
                          ? "btn-dark"
                          : "btn-outline-dark"
                      }`}
                    >
                      SIGNUP
                    </button>
                  </Link>
                  <Link to="/login" onClick={handleNavClick}>
                    <button
                      className={`btn  w-100 py-2 px-3 ${
                        routeName === "/login" ? "btn-dark" : "btn-outline-dark"
                      }`}
                    >
                      LOGIN
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={handleNavClick}>
                    <button
                      className={`btn  w-100 py-2 px-3 ${
                        routeName === "/profile"
                          ? "btn-dark"
                          : "btn-outline-dark"
                      }`}
                    >
                      PROFILE
                    </button>
                  </Link>
                  <Link to="/cart" onClick={handleNavClick}>
                    <button
                      className={`btn  w-100 py-2 px-3 ${
                        routeName === "/cart" ? "btn-dark" : "btn-outline-dark"
                      }`}
                    >
                      <AiOutlineShoppingCart size={22} />
                      {cartList?.length === 0 ? "" : `${cartList.length}`}
                    </button>
                  </Link>
                  <Link to="/" onClick={() => logout()}>
                    <button className={`btn btn-outline-dark w-100 py-2 px-3`}>
                      <FiLogOut />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
