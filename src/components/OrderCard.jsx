import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ children, order, id, goto }) {
  const navigate = useNavigate()
  return (
    <div className="box-shadow hover-scale-sm cursor-pointer" onClick={()=>{navigate(goto, 
    //   {
    //   state:order
    // }
    )}}>
      <div className="card border border-bold" style={{ width: "18rem" }}>
        <img
          src={`${process.env.REACT_APP_API_URL}/${order.productId.picture}`}
          className="card-img-top object-fit-cover"
          alt="..."
          style={{height:'200px'}}
        />
        <div className="card-body">
          {id&&<p className="card-text">ID: {id}</p>}
          <h5 className="card-title">{order.productId.name}</h5>
          <p className="card-text">{order.deliveryStatus}</p>
        </div>
        <ul className="list-group list-group-flush">
          {
            order.deliveryDate?
            <li className="list-group-item text-success">delivery date:{order.deliveryDate}</li>:
            order.cancelDate? <li className="list-group-item text-danger">Cancel date:{order.cancelDate}</li> : <li className="list-group-item text-info">Order date:{order.orderDate}</li>
          }
          {children && <>{children}</>}
        </ul>
      </div>
    </div>
  );
}
