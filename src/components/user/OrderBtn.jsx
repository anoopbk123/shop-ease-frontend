import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OrderBtn({ text, quantity, product }) {
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.isAuthorizedUser);
  return (
    <>
      <button
        onClick={() => {
          isAuthorized? navigate("/order/summary", {
            state: {
              product,
              quantity,
            },
          }):navigate('/login')
        }}
        className="d-block btn btn-success"
      >
        {text}
        <i class="bi bi-bag-fill mx-1"></i>
      </button>
    </>
  );
}
