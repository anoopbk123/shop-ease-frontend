import React from "react";
import './ProductList.css'
import { Link } from "react-router-dom";
import AddToCartBtn from "../user/AddToCartBtn.jsx";

export default function ProductList({products, searchParams}) {
  // console.log(products)
  return (
    <div className="product-list-container container mt-5 pt-3">
      <h2 className="h2 text-center">Our Products</h2>
      <div className="my-3 d-flex flex-wrap justify-content-evenly">
      {products.filter((value)=>{
        return searchParams.get('category')?searchParams.get('category') === value.category : true
      })
      .map((value) => (
        <div key={value._id} className="card box-shadow m-2 p-1 product-card d-flex flex-column justify-content-between" style={{ width: "18rem" }}>
        <img lazy='true' style={{ height: "10rem", objectFit:'cover' }} src={`${process.env.REACT_APP_API_URL}/${value.picture}`} className="card-img-top" alt="..." />
        <div className="card-bod">
          <h5 className="card-title">{value.name}</h5>
          <p className="card-text">
            Price: ${value.price}
          </p>
        </div>
        <div className="d-flex justify-content-between">
        <Link to={`/productdetails/${value._id}`} class="btn d-block btn-info">
            view details
          </Link>
          <AddToCartBtn productId={value._id} />
        </div>
      </div>
      ))}
      </div>
    </div>
  );
}
