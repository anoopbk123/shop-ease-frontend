import React from "react";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAuth } from "../../../Redux/slices/userAuth";

export default function UserNavbar() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.isAuthorizedUser);
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(updateUserAuth());
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/">
            SHOP EASE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>

              {isAuthorized ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myorders">
                      My orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userprofile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <span
                        onClick={handleLogout}
                        className="bg-danger p-1 rounded text-light"
                      >
                        Logout
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <span className="bg-info p-1 rounded text-light">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
