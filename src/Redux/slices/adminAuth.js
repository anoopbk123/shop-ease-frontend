import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState:localStorage.getItem('adminToken')?true:false,
    reducers:{
        updateAdminAuth:(prevState, action)=>{
            return localStorage.getItem('adminToken')?true:false
        }
    }
})
export default adminAuthSlice.reducer
export const {updateAdminAuth} = adminAuthSlice.actions