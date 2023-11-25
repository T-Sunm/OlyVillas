import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userEmail:localStorage.getItem('UserInfo')?
    JSON.parse(localStorage.getItem('UserInfo')).user.email:
    null,
    locationType:undefined,
    placeType:undefined,
    locationData:{lng:0, lat:0},
    mapData:undefined,
    placeSpace:{bathrooms:1, beds:1, guetsts:4},
    placeAmeneties:[],
    photos:[],
    title:"",
    description:"",
    price:10
}

export const createProcessSlice = createSlice({
    name:'CreateProcess',
    initialState,
    reducers:{
        setUserEmail:(state,action)=>{
            state.userEmail = action.payload
        },
        setLocationType:(state,action)=>{
            state.locationType = action.payload
        },
        setPlaceType:(state,action)=>{
            state.placeType = action.payload
        },
        setLocation:(state,action)=>{
            state.locationData = action.payload
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
            state.photos = state.photos.concat(action.payload)
        },
        removePhotos:(state,action)=>{
            state.photos= state.photos.filter(file => file !== action.payload)
        },
        setTitle:(state,action)=>{
            state.title = action.payload
        },
        setDescription:(state,action)=>{
            state.description = action.payload
        },
        setPrice:(state,action)=>{
            state.price = action.payload
        },
    }
})

export const { 
            setUserEmail,
            setLocationType,
            setPlaceType ,
            setLocation,
            setMapData,
            setPlaceSpace,
            setPlaceAmeneties,
            setPhotos,
            removePhotos,
            setTitle,
            setDescription,
            setPrice
            } = createProcessSlice.actions;
export default createProcessSlice.reducer