import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import CreateProductPage from "../pages/admin/CreateProductPage";
import UserList from "../pages/admin/UserList";
import ManageProductsPage from "../pages/admin/ManageProductsPage";
import EditProductPage from "../pages/admin/EditProductPage";
import { useSelector } from "react-redux";
import AdminNavbar from "../components/admin/AdminNavbar";
import Orders from "../pages/admin/Orders";
import OrderDetailsPage from "../pages/admin/OrderDetailsPage";

export default function AdminRouters() {
  const isAuthorizedAdmin = useSelector((store) => store.isAuthorizedAdmin);
  const location = useLocation();
  return (
    <>
      {!(location.pathname === "/admin/login") && <AdminNavbar />}
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        {isAuthorizedAdmin ? (
          <>
            <Route path="/" element={<ManageProductsPage />} />
            <Route path="/createproduct" element={<CreateProductPage />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/editproduct" element={<EditProductPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/order/details/:orderId"
              element={<OrderDetailsPage />}
            />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/admin/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

