import React, { useEffect, useState } from 'react'
import OrderDetails from '../../components/OrderDetails'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOrderDetails, confirmDelivery } from '../../Services/adminApi'
import DeliveryConfirmBtn from '../../components/admin/DeliveryConfirmBtn'

export default function OrderDetailsPage() {
    const [order, setOrder] = useState(null)
    const {state} = useLocation()
    const {orderId} = useParams()
    const navigate = useNavigate()
    // console.log(state)
    const fetchOrderDetails = async () => {
      try{
        // console.log(orderId)
        const res = await getOrderDetails(orderId)
        // console.log(res)
        const data = res.data
        if(data.status){
          setOrder(data.orderDetails)
          // console.log(data.orderDetails)
        }
        else{
          toast.error('please try again later')
          // navigate(-1)
        }
      }catch(err){
        toast.error(err)
        navigate(-1)
      }
    }
    useEffect(()=>{
      state?setOrder(state):fetchOrderDetails()
    }, [])
  return (
    <>
     {order&&<OrderDetails order={order}>
     {order.deliveryStatus === 'processing' && <DeliveryConfirmBtn fetchOrderDetails={fetchOrderDetails} order={order} confirmDelivery = {confirmDelivery} />}
     </OrderDetails> }
    </>
  )
}
