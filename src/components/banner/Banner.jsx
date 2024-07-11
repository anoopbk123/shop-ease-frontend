import React from 'react'
import bannerImg from '../../data/images/Banner.jpg'
import './Banner.css'
import icons from '../../data/icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Banner(prop) {
  const isAuthorized = useSelector(state=>state.isAuthorizedUser)
  return (
    <div id='banner-container' className='mt-5 pt-2 position-relative banner-container'>
      <Link to={`${isAuthorized?'/cart':'/login'}`} className='cart-icon z-3 display-1 text-danger position-absolute hover-scale'><i className={icons.cart}></i></Link>
      <img src={bannerImg} alt="banner" className='img-fluid banner-img' id='banner-img' />
      <h1 id='banner-head' className='banner-head mx-1 p-0'>{prop.titleP1}<br/><span id='titleP2' className='titleP2'>{prop.titleP2}</span></h1>
    </div>
  )
}
