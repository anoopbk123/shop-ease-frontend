import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrderApi, userProfile } from "../../Services/userApi";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const [user, setUser] = useState(null);
  const {
    state: { product, quantity },
  } = useLocation();
  const [orderFormData, setOrderFormData] = useState({
    quantity: quantity,
    paymentMethod: "",
  });
  const [orderFormDataError, setOrderFormDataError] = useState({
    quantity: '',
    paymentMethod: '',
  });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const res = await userProfile();
      const data = res.data;
      if (!data.status) {
        if (data.loginFailed) {
          toast.error(data.message);
          navigate("/login");
        } else {
          toast.error(data.message);
          navigate(-1);
        }
      } else {
        setUser(data.user);
      }
    } catch (err) {
      toast.error(err.message);
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check quantity validity on mount
    if (quantity <= 0) {
      setOrderFormDataError((prevData) => ({
        ...prevData,
        quantity: "Minimum 1 quantity is required",
      }));
    } else if (quantity > product.stock) {
      setOrderFormDataError((prevData) => ({
        ...prevData,
        quantity: `only ${product.stock} left`,
      }));
    }
  }, [quantity, product.stock]);

  const handleOrderFormDataChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "quantity") {
      if (parseInt(value) <= 0 || value==='') {
        setOrderFormDataError((prevData) => ({
          ...prevData,
          quantity: "Minimum 1 quantity is required",
        }));
      } else if (parseInt(value) > product.stock) {
        setOrderFormDataError((prevData) => ({
          ...prevData,
          quantity: `only ${product.stock} left`,
        }));
      } else {
        // Clear quantity error if quantity is valid
        setOrderFormDataError((prevData) => ({
          ...prevData,
          quantity: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!orderFormData.paymentMethod){
      toast.error('select payment method')
    }
    else{
      if(orderFormDataError.quantity){
        toast.error(orderFormDataError.quantity)
      }
      else{
        try{
         const res = await createOrderApi({
          ...orderFormData,
          productId:product._id,
          price: orderFormData.quantity * product.price,
         })
         if(res.data.status){
          toast.success(res.data.message)
          navigate('/myorders')
         }
         else{
          toast.error(res.data.message)
         }
        }
        catch(err){
          toast.error(err.message)
        }
      }
    }
  };

  return (
    <div className="container mt-5 pt-3">
      <h1 className="text-center h1 mt-1">Order Summary</h1>
      {user && (
        <div className="container row">
          <div className="box-shadow rounded mt-3 p-2 word-wrap col-sm-12 col-md-6 mx-md-2">
            {/* Delivery Address */}
            <div className="d-flex justify-content-between">
              <div className="fw-bold">Deliver to:</div>
              <div>
                <button
                  onClick={() => {
                    navigate("/userprofile");
                  }}
                  className="btn btn-secondary"
                >
                  Change Address
                </button>
              </div>
            </div>
            <div className="fw-bold">{user.name}</div>
            <div>
              <address>{user.address}</address>
              {user.email}
              <br />
              {user.phone}
            </div>
          </div>
          <div className="box-shadow rounded mt-3 p-2 word-wrap col-sm-12 col-md-5">
            {/* Product details */}
            <div className="d-flex justify-content-start flex-wrap">
              <div className="align-self-center" style={{ width: "200px" }}>
                <Link to={`/productdetails/${product._id}`}>
                  <img
                    className="img img-fluid rounded"
                    src={`${process.env.REACT_APP_API_URL}/${product.picture}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="mx-3">
                <h6 className="text-center">{product.name}</h6>
                <form onSubmit={handleSubmit}>
                  <label className="form-label" htmlFor="order-quantity">
                    Quantity:{" "}
                    <input
                      onChange={handleOrderFormDataChange}
                      value={orderFormData.quantity}
                      id="order-quantity"
                      name="quantity"
                      className={`form-control m-1 ${
                        orderFormDataError.quantity ? "is-invalid" : ""
                      }`}
                      type="number"
                      style={{
                        maxWidth: "100px",
                        height: "1.5em",
                        display: "inline",
                      }}
                    />
                    {orderFormDataError.quantity && (
                      <div className="invalid-feedback">
                        {orderFormDataError.quantity}
                      </div>
                    )}
                  </label>
                  <div>
                    <select
                      onChange={handleOrderFormDataChange}
                      value={orderFormData.paymentMethod}
                      name="paymentMethod"
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                    >
                      <option disabled value="">
                        Payment Method
                      </option>
                      <option value="COD">Cash on Delivery</option>
                    </select>
                  </div>
                  <p>Price: ${orderFormData.quantity * product.price}</p>
                  <button type="submit" className="btn btn-warning">
                    Purchase
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
