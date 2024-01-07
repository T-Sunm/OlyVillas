import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 0,
    validSteps: {
        0: true,
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: true,
        7: true,
        8: false,
        9: false,
        10: false,
        11: false,
        12: true,
        13: false,
    }

}

export const createStepSlice = createSlice({
    name: 'StepSlice',
    initialState,
    reducers: {
        setStepIncrease: (state, action) => {
            state.step += 1
        },
        setStepDecrease: (state, action) => {
            state.step -= 1
        },
        setValidStep: (state, action) => {
            const { step, status } = action.payload;
            state.validSteps[step] = status;
        },
        setStep: (state, action) => {
            state.step = action.payload
        }
    }
})
export const { setStepIncrease, setStepDecrease, setValidStep, setStep } = createStepSlice.actions
export default createStepSlice.reducer