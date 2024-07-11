import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL

const userInstance = axios.create({
    baseURL
});

const adminInstance = axios.create({
    baseURL: `${baseURL}/admin`,
})

adminInstance.interceptors.request.use((req)=>{
    const token = localStorage.getItem('adminToken')
    req.headers.Authorization = `Bearer ${token}`;
    return req
})
userInstance.interceptors.request.use((req)=>{
    const token = localStorage.getItem('userToken')
    req.headers.Authorization = `Bearer ${token}`;
    return req;
})



export {userInstance, adminInstance};