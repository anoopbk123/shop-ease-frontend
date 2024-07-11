import { useNavigate } from "react-router-dom";
import AddToCartBtn from "../user/AddToCartBtn";
import OrderBtn from "../user/OrderBtn";

export default function ProductDetails({product}) {
  const navigator = useNavigate()
  // const [product, setProduct] = useState(null)
  // const productId = useParams(pid)
  // useEffect(() => {
  //   const productDetails = await axioms.get()
  // })
  return (
    <div className="container mt-5 pt-3">
      <div className="container box-shadow rounded product-details my-2 mb-3 p-3">
        <div className="row gap-1">
          <div className="col-12 col-md-5 align-self-center">
            <img src={`${process.env.REACT_APP_API_URL}/${product.picture}`} className="img img-fluid rounded" alt="" />
          </div>
          <div className="col-12 col-md-6 align-self-center">
            <h3 className="h3">{product.name}</h3>
            <p className="fw-bold">Price: $ {product.price}</p>
            <p>Available Stock: {product.stock}</p>
            <p className="text-align-justify">{product.description}</p>
            <div className="d-flex">
            <AddToCartBtn productId={product._id} />
            <div className="mx-2"></div>
            <OrderBtn product={product} quantity={1} text='Order Now' />
            </div>
          </div>
        </div>
      </div>
      <div className="text-left">
      <button onClick={()=>{
        navigator(-1)
      }} type="submit" className="btn btn-secondary">
             &larr; Go Back
            </button>
      </div>
    </div>
  );
}
