import { createSlice } from "@reduxjs/toolkit";
import { updateFavourites } from "../../utils/common";

const initialState  = {
    authenticated:localStorage.getItem('UserInfo') ? true : false,
    toggleAuthenticated : false,
    userInfo:localStorage.getItem('UserInfo')?
    JSON.parse(localStorage.getItem('UserInfo')):
    null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthModalFalse:(state)=>{
            state.authenticated = false
        },
        setAuthModalTrue : (state)=>{
            state.authenticated= true
        },
        setToggleModal:(state,action)=>{
            state.toggleAuthenticated = action.payload
        },
        setUserInfo:(state, action)=>{
            state.userInfo = action.payload
        },
        setFavResidenciesID:(state, action)=>{
            const ResidencyId = action.payload
            console.log(state.userInfo)
            state.userInfo.user.favResidenciesID = updateFavourites(ResidencyId,state.userInfo.user.favResidenciesID)
            localStorage.setItem('UserInfo',JSON.stringify(state.userInfo))
        }
    }
})
export const {setAuthModalFalse , setAuthModalTrue,setToggleModal,setUserInfo,setFavResidenciesID} = authSlice.actions
export default authSlice.reducer