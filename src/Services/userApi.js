import { userInstance } from "../Axios/axiosinstance";

//POST METHODS
export const userSignup = values => {
   return userInstance.post("/signup",{...values});
}
export const userLogin = values => {
    return userInstance.post("/login", {...values})
}
export const createOrderApi = values => {
    return userInstance.post("/createOrder", {...values})
}

//GET METHODS
export const userProfile = ()=>{
    return userInstance.get('/profile');
}
export const getUnblockedProducts = ()=>{
    return userInstance.get('/products')
}
export const getProductDetails = (id) =>{
    return userInstance.get(`/product-details/${id}`)
}
export const getCart = ()=>{
    return userInstance.get('/getCart')
}
export const getMyOrders = () =>{
    return userInstance.get('/myorders')
}
export const getOrderDetails = (orderId) => {
    // console.log(orderId)
    return userInstance.get(`/order/details/${orderId}`)
}
//PUT METHODS
export const userProfileEdit = (values) => {
    return userInstance.put("/editprofile", {...values})
}
export const addToCartApi = productId => {
    return userInstance.put(`/addtocart/${productId}`)
}
export const editCartQuantityApi = (values) => {
    return userInstance.put('/editcartqty', {...values})
}
export const removeCartItemApi = productId =>{
    return userInstance.put(`/removecartitem/${productId}`)
}
export const cancelOrder = (orderId) =>{
    return userInstance.put('/order/cancel',{orderId});
}
