import React from "react";
import { toast } from "react-toastify";
import icons from "../../data/icons";
import { addToCartApi } from "../../Services/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddToCartBtn({ productId }) {
  const navigate = useNavigate();
  const isAuthorized = useSelector((store) => store.isAuthorizedUser);
  const addToCart = async () => {
    try {
      const res = await addToCartApi(productId);
      const data = res.data;
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <button
      onClick={() => {
        return isAuthorized ? addToCart() : navigate("/login");
      }}
      className="btn btn-warning"
    >
      Add to cart <i className={icons.cart}></i>
    </button>
  );
}
