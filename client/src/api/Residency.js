import axios from "axios";
import { toast } from "react-toastify";

import {QueryClient} from 'react-query'
export const queryClient = new QueryClient()


export const api = axios.create({
    baseURL:"http://localhost:8080/api/user"
})

export const FavouritesResidency = async (ResidencyId,email)=>{
    try {
        const result = await api.post(`/toFav/${ResidencyId}`,{email})
        if (result.status === 401 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const DeleteResidency = async(ResidencyId,emailUser)=>{
    try {
        const body = { emailUser: emailUser }
        console.log(body)
        const result = await api.delete(`/deleteResidency/${ResidencyId}`,{ data: body })
        if (result.status === 401 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const deleteImageResy = async(ResidencyId,idImage)=>{
    try {
        console.log(ResidencyId,idImage)
        const body = {idImage}
        const result = await api.delete(`/updateResidency/${ResidencyId}/deleteImages`,{ data: body })
        if (result.status === 401 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const updateImageResy = async(ResidencyId,idImage)=>{
    try {
        console.log(ResidencyId,idImage)
        const body = {idImage}
        const result = await api.delete(`/updateResidency/${ResidencyId}/createImages`,{ data: body })
        if (result.status === 404 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const updateResidency = async(ResidencyId,data)=>{
    try {
        const result = await api.put(`/updateResidency/${ResidencyId}`,data)
        if (result.status === 401 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}


