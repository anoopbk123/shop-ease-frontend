import { adminInstance } from "../Axios/axiosinstance";

//POST METHODS
//login
export const adminLogin = (values) => {
    return adminInstance.post('/login',{
        ...values
    })
}
//create product
export const createProductApi = (values) => {
    return adminInstance.post('/create-product',{...values},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

//GET METHODS
export const userList = () => {
    return adminInstance.get('/users')
}
export const getProducts = () => {
    return adminInstance.get('/products')
}
export const getOrders = () => {
    return adminInstance.get('/orders');
}
export const getOrderDetails = (orderId) => {
    // console.log(orderId)
    return adminInstance.get(`order/details/${orderId}`)
}

//PUT METHODS
export const editProduct = values =>{
    return adminInstance.put('/edit-product',{...values})
}
export const updateUserBlockStatus = (values)=>{
    return adminInstance.put('/update-user-block',{...values})
}
export const updateProductBlockStatus = (values)=>{
    return adminInstance.put('/update-product-block',{...values})
}
export const confirmDelivery = (orderId) =>{
    return adminInstance.put('/delivery/confirm',{orderId});
}