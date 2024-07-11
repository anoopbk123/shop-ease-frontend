import React from 'react'
import Banner from '../../components/banner/Banner'
import Features from '../../components/features/Features'
import AboutUs from '../../components/about/AboutUs'
import Footer from '../../components/footer/Footer'

export default function HomePage() {
  return (
    <>
     <Banner titleP1="Shop with Ease:" titleP2 =" Your One-Stop Online Destination!" /> 
     <div className='mt-lg-5 pt-lg-2'>
     <Features/>
     </div>
     <AboutUs/>
     <Footer/>
    </>
  )
}
