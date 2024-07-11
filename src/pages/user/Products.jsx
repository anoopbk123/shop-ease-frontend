import React, { useEffect, useState } from 'react'
import Filter from '../../components/filter/Filter'
import ProductList from '../../components/product-list/ProductList'
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUnblockedProducts } from '../../Services/userApi';

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const fetchProducts = async ()=>{
    try{
      const res = await getUnblockedProducts()
      const data = res.data
      if(data.status){
        setProducts(data.products)
        if(data.products.length === 0){
          toast.error('no products available')
          navigate('/')
        }
        else{
          // console.log(data.products)
          const category = [];
          data.products.forEach((value)=>{
            if(!category.includes(value.category)){
              category.push(value.category)
            }
          })
          setUniqueCategory(category)
        }
      }
      else{
        toast.error('cannot get data')
        navigate('/')
      }
    }
    catch(err){
      toast.error(err)
      navigate('/')
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <>
      {
        products.length ?<>
        <Filter category={uniqueCategory} setSearchParams={setSearchParams} />
      <ProductList searchParams={searchParams} products={products} />
        </>:
        <h2 className='h2 m-5 p-5 text'>
          Loading .....
        </h2>
      }
    </>
  )
}
