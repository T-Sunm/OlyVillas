import axios from "axios";
import { toast } from "react-toastify";

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

export const DeleteResidency = async(ResidencyId)=>{
    try {
        const result = await api.delete(`/deleteResidency/${ResidencyId}`)
        if (result.status === 401 || result.status=== 500){
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}
