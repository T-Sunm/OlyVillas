import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}

export const PropertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { setData } = PropertiesSlice.actions;

export default PropertiesSlice.reducer