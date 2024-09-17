import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Navbar(props) {
  const history = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    history("/");
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <NavbarStyled activeLink={activeLink}>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/dashboard" ? "active" : ""}`}
                  to="/dashboard"
                  onClick={() => handleLinkClick("/dashboard")}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/income" ? "active" : ""}`}
                  to="/income"
                  onClick={() => handleLinkClick("/income")}
                >
                  Income
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/expense" ? "active" : ""}`}
                  to="/expense"
                  onClick={() => handleLinkClick("/expense")}
                >
                  Expense
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/transactions" ? "active" : ""}`}
                  to="/transactions"
                  onClick={() => handleLinkClick("/transactions")}
                >
                  Transactions
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? 
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
              </form> 
              : 
              <div className="d-flex">
                <span className="navbar-text mx-3">{props.credentials.email}</span>
                <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </NavbarStyled>
  );
}

const NavbarStyled = styled.div`
  .navbar {
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  }

  .nav-link {
    font-family: 'Arial', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-right: 1rem;
    position: relative;
    padding: 0.7rem 2rem;
    transition: all 0.3s ease;
    border-radius: 0.25rem;

    &:hover,
    &.active {
      color: rgb(16, 124, 227);
      background-color: rgba(11, 114, 212, 0.1);
    }
  }

  .btn-secondary {
    background-color: rgba(11, 114, 212, 1);
    border-color: rgba(11, 114, 212, 1);
    color: #fff;
  }

  .btn-secondary:hover {
    background-color: rgba(11, 114, 212, 0.8);
    border-color: rgba(11, 114, 212, 0.8);
  }

  .form-check-input {
    cursor: pointer;
  }
`;

export default Navbar;
