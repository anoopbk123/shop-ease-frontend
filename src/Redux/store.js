import { configureStore } from "@reduxjs/toolkit";
import userAuth from "./slices/userAuth";
import adminAuth from "./slices/adminAuth";
const store = configureStore({
    reducer:{
        isAuthorizedUser: userAuth,
        isAuthorizedAdmin: adminAuth,
    }
})
export default store