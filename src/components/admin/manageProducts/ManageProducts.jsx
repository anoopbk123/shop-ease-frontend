import React, { useEffect, useState } from "react";
import "./ManageProducts.css";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, updateProductBlockStatus } from "../../../Services/adminApi";
import { toast } from "react-toastify";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const data = res.data;
      if (data.status) {
        // console.log(data.products)
        setProducts(data.products);
        // navigate
      } else {
        toast.error(data.message);
        navigate("/admin/login");
      }
    } catch (err) {
      toast.error(err.message);
      navigate("/");
    }
  };
  const updateBlockStatus = async(productID, blockStatus)=>{
    try{
      const res = await updateProductBlockStatus({productID, blockStatus})
      const data = res.data
      if(data.status){
        toast.success(`${blockStatus?'product unblocked' : 'product blocked'}`)
        fetchProducts()
      }
      else{
        toast.error('Update failed')
      }
    }
    catch(err){
      toast.error(err)
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="container mt-5 pt-3">
      <h2 className="h2 text-center">Manage products</h2>
      {products.length ? (
        <>
          <div className="table-responsive">
            <table class="table mt-2 table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Picture</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col" className="text-center">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((value) => (
                  <tr key={value._id}>
                    <td>
                      <Link to={`/productdetails/${value._id}`}>
                      <img
                        className="pd-img img-fluid"
                        src={`${process.env.REACT_APP_API_URL}/${value.picture}`}
                        alt=""
                      />
                      </Link>
                    </td>
                    <td>{value.name}</td>
                    <td>{value.category}</td>
                    <td>${value.price}</td>
                    <td>{value.stock}</td>
                    <td>
                      <button
                        onClick={() => navigate("/admin/editproduct",
                        {
                          state:value
                        }
                        )}
                        className="btn btn-warning m-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={()=>{
                          updateBlockStatus(value._id, value.blockStatus)
                        }}
                        className={`btn btn-${
                          value.blockStatus ? "success" : "danger"
                        } m-1`}
                      >
                        {value.blockStatus ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h2 className="text-center">Loading....</h2>
      )}
    </div>
  );
}
