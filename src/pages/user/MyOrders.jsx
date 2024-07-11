import React, { useEffect, useState } from "react";
import OrderCard from "../../components/OrderCard";
import { getMyOrders } from "../../Services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      const data = res.data;
      if(data.status){
        if(data.orders.length){
            setOrders(data.orders)
            // console.log(data.orders)
        }
        else{
            toast.error('No orders')
            navigate(-1)
        }
      }
      else{
        toast.error(data.message)
        navigate(-1)
      }
    } catch (err) {
      toast.error(err.message);
      navigate(-1)
    }
  };
  useEffect(()=>{
    fetchOrders()
  },[])
  return (
    <div className="m-1 mt-5 pt-1">
      <h1 className="h1 mt-3 text-center">My Orders</h1>
      {orders.length ? 
      <div className="d-flex flex-wrap justify-content-evenly gap-2 mt-3">
      {
        orders.map(value=>(
            <OrderCard goto={`/order/details/${value._id}`} key={value._id} order={value} />
        ))
      }
    </div> : <h2>Loading....</h2>
      } 
    </div>
  );
}
