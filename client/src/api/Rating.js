import axios from 'axios'
import { toast } from 'react-toastify'

export const api = axios.create({
    baseURL: "http://localhost:8080/api/user"
})

export const createRating = async (data) => {
    try {
        const result = await api.post('/createRating', { data })

    } catch (error) {
        toast.error("Something went wrong , Please try again")
        console.log(error)
        throw error
    }
}

export const getRatingbyauthorEmail = async (userEmail, residencyId) => {
    console.log(residencyId)
    try {
        const result = await api.post('/getAllRatingbyUser', { userEmail, residencyId })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data

    } catch (error) {
        toast.error("Something went wrong , Please try again")
        console.log(error)
        throw error
    }
}