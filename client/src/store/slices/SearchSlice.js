import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    placeSpace: {
        bathrooms: {
            quantity: 1,
        },
        beds: {
            quantity: 1,
        },
        guetsts: {
            quantity: 4,
        },
        bedrooms: {
            quantity: 1,
        }
    },
    locationData: { lng: 0, lat: 0 },
    mapData: undefined,
    startDate: undefined,
    endDate: undefined
}

export const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setPlaceSpace: (state, action) => {
            state.placeSpace = action.payload
        },
        setMapData: (state, action) => {
            state.mapData = action.payload
        },
        setLocation: (state, action) => {
            state.locationData = action.payload
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        }
    }
})
export const { setPlaceSpace,
    setLocation,
    setStartDate, setEndDate, setMapData, setIsOpen } = SearchSlice.actions;

export default SearchSlice.reducer