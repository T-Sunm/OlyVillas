import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    value:false,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthModalFalse:(state)=>{
            state.value = false
        },
        setAuthModalTrue : (state)=>{
            state.value=true
        }
    }
})
export const {setAuthModalFalse , setAuthModalTrue} = authSlice.actions
export default authSlice.reducer