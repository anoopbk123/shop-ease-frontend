import React from 'react'
import { toast } from 'react-toastify'

export default function DeliveryConfirmBtn({order, confirmDelivery, fetchOrderDetails}) {
    const handleConfirmDelivery = async () =>{
        if(window.confirm('Are you sure to confirm this delivery')){
          try{
            const res = await confirmDelivery(order._id)
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
          <button onClick={handleConfirmDelivery} className="btn btn-success mt-2">Confirm Delivery</button>
        </div>
      )
    }
