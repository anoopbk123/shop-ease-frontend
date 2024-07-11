import React, { useEffect, useState } from "react";
import CartCard from "../../components/user/CartCard";
import { toast } from "react-toastify";
import { getCart } from "../../Services/userApi";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState();
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const res = await getCart();
      const data = res.data;
      if (data.status) {
        if(data.cart.length){
          // console.log(data.cart);
        setCart(data.cart);
        }
        else{
          toast.error('Cart is empty');
          navigate('/');
        }
      }
      else {
        toast.error(data.message);
        navigate('/');
      }
    } catch (err) {
      toast.error(err.message);
      navigate('/');
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className="container mt-5 pt-4">
      <h2 className="text-center">Cart</h2>
      {
        cart?<>
        <div className="my-3 d-flex flex-wrap justify-content-evenly">
        {
          cart.map((item, index)=>(
            <CartCard fetchCart={fetchCart} cart={item} key={index} />
          ))
        }
      </div>
        </>:
        <h4>
          Loading......
        </h4>
      }
    </div>
  );
}
