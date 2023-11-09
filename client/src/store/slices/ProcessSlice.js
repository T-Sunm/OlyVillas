import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    locationType:undefined,
    placeType:undefined,
    location:{lng:0, lat:0},
    mapData:undefined,
    placeSpace:{bathrooms:1, beds:1, guetsts:4},
    placeAmeneties:[],
    photos:[],
    title:"",
    description:"",
    price:0
}

export const createProcessSlice = createSlice({
    name:'CreateProcess',
    initialState,
    reducers:{
        setLocationType:(state,action)=>{
            state.locationType = action.payload
        },
        setPlaceType:(state,action)=>{
            state.placeType = action.payload
        },
        setLocation:(state,action)=>{
            state.location = action.payload
        },
        setMapData:(state,action)=>{
            state.mapData = action.payload
        },
        setPlaceSpace:(state,action)=>{
            state.placeSpace = action.payload
        },
        setPlaceAmeneties:(state,action)=>{
            state.placeAmeneties = action.payload
        },
        setPhotos:(state,action)=>{
            state.photos = state.photos.concat( action.payload)
        },
        removePhotos:(state,action)=>{
            state.photos= state.photos.filter(file => file.name !== action.payload)
        },
        setTitle:(state,action)=>{
            state.title = action.payload
        },
        setDescription:(state,action)=>{
            state.photos = action.payload
        },
        setPrice:(state,action)=>{
            state.photos = action.payload
        },
    }
})

export const { setLocationType,
            setPlaceType ,
            setLocation,
            setMapData,
            setPlaceSpace,
            setPlaceAmeneties,
            setPhotos,
            removePhotos
            } = createProcessSlice.actions;
export default createProcessSlice.reducer