import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ResidencyId:undefined,
    tripInfo:{},
    price:0,
    startDate:undefined,
    endDate:undefined
}
export const createReservationSlice = createSlice({
    name : "reservation",
    initialState,
    reducers:{
        setResidencyId:(state,action)=>{
            state.ResidencyId = action.payload
        },
        setTripInfo:(state,action)=>{
            state.tripInfo = action.payload
        },
        setPrice:(state,action)=>{
            state.price = action.payload
        },
        setStartDate:(state,action)=>{
            state.startDate = action.payload
        },
        setEndDate:(state,action)=>{
            state.endDate = action.payload
        }

    }
})

export const {setUserId,
    setResidencyId,
    setTripInfo,
    setPrice,
    setStartDate,setEndDate} = createReservationSlice.actions;

export default createReservationSlice.reducer