import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/user"
})

export const EditUserInfo = async (email, firstName, lastName) => {
    try {
        const result = await api.post(`/editUserInfo`, { email, firstName, lastName })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}
export const EditEmail = async (newEmail, oldEmail) => {
    try {
        const result = await api.post(`/editEmail`, { newEmail, oldEmail })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const editPassword = async (email, oldPassword, newPassword) => {
    try {
        const result = await api.post('/editPassword', { email, oldPassword, newPassword })
        if (result.status === 401 || result.status === 400 || result.status === 500 || result.status === 404) {
            throw result.data
        }
        return result.data
    } catch (error) {
        if (error.response.data.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Something went wrong , Please try again")
        }
        throw error
    }
}