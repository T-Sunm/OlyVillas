import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    step:0
}

export const createStepSlice = createSlice({
    name:'StepSlice',
    initialState,
    reducers:{
        setStepIncrease:(state,action)=>{
            state.step += 1
        },
        setStepDecrease:(state,action)=>{
            state.step -= 1
        },
    }
})
export const {setStepIncrease,setStepDecrease } = createStepSlice.actions
export default createStepSlice.reducer