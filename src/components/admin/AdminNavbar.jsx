import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAdminAuth } from "../../Redux/slices/adminAuth";

export default function AdminNavbar() {
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    localStorage.removeItem('adminToken')
    dispatch(updateAdminAuth())
  }
  return (
    <header>
      <nav class="navbar navbar-expand-lg custom-navbar fixed-top">
        <div class="container-fluid">
          <Link class="navbar-brand text-light" to="#">
            SHOP EASE
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link text-dark" aria-current="page" to="/admin/createproduct">
                  Create Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin/">
                  Manage Products
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin/orders">
                  Orders
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin/userlist">
                  Users
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-reset" to="/admin">
                  <span onClick={handleLogout} className="bg-danger p-1 rounded text-light">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
