import React from "react";
import { Link } from "react-router-dom";

export default function OrderDetails({ order, children }) {
  // console.log(order);
  return (
    <div>
      <div className="container my-2 mt-5 pt-3">
        <h1 className="text-center h1 mt-1">Order Details</h1>
        <p className="fw-semibold">Order ID: {order._id}</p>
        <div className="container row gap-3">
          <div className="box-shadow rounded p-2 word-wrap col-sm-12 col-md-6">
            {/* Product details */}
            <div className="d-flex justify-content-start flex-wrap">
              <div className="align-self-center" style={{ maxWidth: "300px" }}>
                <Link to={`/productdetails/${order.productId._id}`}>
                  <img
                    className="img img-fluid rounded"
                    src={`${process.env.REACT_APP_API_URL}/${order.productId.picture}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="mx-3">
                <h6 className="text-center">{order.productId.name}</h6>
                <div>
                  <div>Quantity:{order.quantity}</div>
                  <div>Payment method: {order.paymentMethod}</div>
                  <p>Price: ${order.price}</p>
                  <p>Order Date: {order.orderDate}</p>
                  <p>
                    Delivery Status:{" "}
                    {order.deliveryStatus === "canceled" ? (
                      <span className="text-danger">{order.deliveryStatus}</span>
                    ) : order.deliveryStatus === "success" ? (
                      <span className={`text-${order.deliveryStatus}`}>
                        {order.deliveryStatus}{" "}
                      </span>
                    ) : (
                      <span className="text-info">{order.deliveryStatus} </span>
                    )}
                  </p>
                  {order.deliveryDate && (
                    <p>Delivery Date: {order.deliveryDate} </p>
                  )}
                  {order.cancelDate && <p>Cancel Date: {order.cancelDate}</p>}
                  {order.invoice && (
                    <a
                      href={`${process.env.REACT_APP_API_URL}/${order.invoice}`}
                      download
                      className="btn btn-success"
                    >
                      Download Invoice
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Delivery Address */}
          <div className="box-shadow rounded p-2 word-wrap col-sm-12 col-md-5">
            <div className="d-flex justify-content-between">
              <div className="fw-semibold">Delivery Address</div>
              {/* <div>
                <button
                  onClick={() => {
                    navigate("/userprofile");
                  }}
                  className="btn btn-secondary"
                >
                  Change Address
                </button>
              </div> */}
            </div>
            <div className="fw-semibold">{order.userId.userName}</div>
            <div>
              <address>{order.userId.address}</address>
              Email: {order.userId.email}
              <br />
              Phone: {order.userId.phone}
            </div>
          </div>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
