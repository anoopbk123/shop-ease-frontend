import React from 'react'
import EditProduct from '../../components/admin/editproduct/EditProduct'
import { useLocation } from 'react-router-dom'

export default function EditProductPage() {
  const {state:product} = useLocation()
  // console.log(product)
  return (
    <>
     <EditProduct product={product} /> 
    </>
  )
}
