import React, { useEffect, useState } from 'react'
import ProductDetails from '../../components/product-details/ProductDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductDetails } from '../../Services/userApi';

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()
  const {id} = useParams()
  const fetchProductDetails = async ()=>{
    try{
      const res = await getProductDetails(id)
      const data = res.data
      if(data.status){
        setProduct(data.product)
        // console.log(data.product)
      }
      else{
        toast.error(data.message)
        navigate(-1)
      }
    }
    catch(err){
      toast.error(err)
      navigate(-1)
    }
  }
  useEffect(()=>{
    fetchProductDetails()
  },[])
  return (
    <>
     {
      product?<>
      <ProductDetails product={product} /> 
      </>:
      <h2>
        Loading .....
      </h2>
     }
    </>
  )
}
