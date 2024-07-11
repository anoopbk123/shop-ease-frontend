import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLoginPage from '../pages/user/UserLoginPage'
import UserNavbar from '../components/user/navbar/UserNavbar'
import Registration from '../pages/user/Registration'
import HomePage from '../pages/user/HomePage'
import Products from '../pages/user/Products'
import ProductDetailsPage from '../pages/user/ProductDetailsPage'
import UserProfile from '../pages/user/UserProfile'
import { useSelector } from 'react-redux'
import Cart from '../pages/user/Cart'
import OrderSummary from '../pages/user/OrderSummary'
import MyOrders from '../pages/user/MyOrders'
import OrderDetailsPage from '../pages/user/OrderDetailsPage'

export default function UserRouters() {
  const isAuthorized = useSelector((state)=>state.isAuthorizedUser)
  return (
    <>
    <UserNavbar/>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<UserLoginPage/>}/>
      <Route path='/signup' element={<Registration/>}/>
      <Route path='/products' element={<Products/>} />
      <Route path='/productdetails/:id' element={<ProductDetailsPage/>}/>
      {
        isAuthorized&&(
        <>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order/summary' element={<OrderSummary/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/order/details/:orderId' element={<OrderDetailsPage/>}/>
        </>
      )
      }
      {/* Default route */}
      <Route path='*' element={<HomePage/>}/>
    </Routes>
    </>
  )
}
