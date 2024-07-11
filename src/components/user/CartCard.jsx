import React from "react";
import { Link } from "react-router-dom";
import OrderBtn from "./OrderBtn";
import { editCartQuantityApi, removeCartItemApi } from "../../Services/userApi";
import {toast} from "react-toastify"

export default function CartCard({ cart, fetchCart }) {
  // console.log("cart", cart);
  // const [showModal, setShowModal] = useState(false)

  const editCartQuantity = async (quantity) => {
    try{
      const res = await editCartQuantityApi({
        quantity,
        productId: cart.productId._id
      })
      const data = res.data
      if(data.status){
        toast.success(data.message)
        fetchCart()
      }
      else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  const handleQtyChange = (e) => {
    const value = e.target.value
    if(value === "More"){
      // console.log('hh')
    }
    else{
      editCartQuantity(value)
    }
  }
  const removeCartItem = async () =>{
    try{
      const res = await removeCartItemApi(cart.productId._id)
      const data = res.data
      if(data.status){
        toast.success(data.message)
        fetchCart()
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }
  return (
    <>
      <div
        className="card m-2 p-1 hover-scale-sm d-flex flex-column justify-content-between box-shadow"
        style={{ width: "18rem" }}
      >
        <Link
        to={`/productdetails/${cart.productId._id}`}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/${cart.productId.picture}`}
            className="card-img-top"
            alt="..."
          />
        </Link>
        <div className="card-bod">
          <h5 className="card-title">{cart.productId.name}</h5>
          <div className="d-flex flex-wrap justify-content-between">
            <p className="card-text">
              <label className="">
                Qty:{" "}
                <select onChange={handleQtyChange}>
                  <option value={cart.quantity}>{cart.quantity}</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                <option  key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
                <option className="text-primary" value='More'>More</option>
                </select>
              </label>
            </p>
            <p className="card-text">
              Price: ${cart.productId.price * cart.quantity}
            </p>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          <button onClick={removeCartItem} className="d-block btn btn-warning">
            <i className="bi bi-trash mx-1"></i>
            Remove
          </button>
          { cart.productId.blockStatus  ? (
            <div className="text-danger fw-bold">Currently Unavailable</div>
          ) : cart.productId.stock === 0 ? (
            <div className="text-danger fw-bold">Out of Stock</div>
          ) :cart.productId.stock < cart.quantity ? (
            <div className="text-danger fw-bold">Out of Stock only {cart.productId.stock} available</div>
          ) : (
            <OrderBtn quantity={cart.quantity} product={cart.productId} text="Buy this now" />
          )
          }
        </div>
      </div>
      {/* Quantity input modal */}
      {/* <div>
        <div>Modal</div>
      </div> */}
    </>
  );
}
