import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationType:undefined,
    placeType:undefined,
    locationData:{lng:0, lat:0},
    mapData:undefined,
    placeSpace:{bathrooms:1, beds:1, guetsts:4,bedrooms:1},
    placeAmeneties:[],
    photos:[],
    title:"",
    description:"",
    price:10
}

export const EditPropSlice = createSlice({
    name:'EditProp',
    initialState,
    reducers:{
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

export const {setTitle,
    setLocationType,
    setPlaceType,
    setLocation,
    setMapData,
    setPlaceSpace,
    setPlaceAmeneties,
    setPhotos,
    removePhotos,
    setDescription,
    setPrice } = EditPropSlice.actions
export default EditPropSlice.reducer