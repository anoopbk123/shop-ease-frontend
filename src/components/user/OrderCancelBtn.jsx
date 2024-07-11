import React from 'react'
import { toast } from 'react-toastify'

export default function OrderCancelBtn({order, cancelOrder, fetchOrderDetails}) {
  const handleCancel = async () =>{
    if(window.confirm('Are you sure to cancel this order')){
      try{
        const res = await cancelOrder(order._id)
        const data = res.data
        if(data.status){
          toast.success(data.message)
          fetchOrderDetails()
        }
        else{
        toast.error(data.message);
        }
      }
      catch(err){
        toast.error(err.message);
      }
    }
  }
  return (
    <div>
      <button onClick={handleCancel} className="btn btn-danger mt-2">Cancel Order</button>
    </div>
  )
}
