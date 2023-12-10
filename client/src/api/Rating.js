import axios from 'axios'
import { toast } from 'react-toastify'

export const api = axios.create({
    baseURL: "http://localhost:8080/api/user"
})

export const createRating = async (data) => {
    console.log(data)
    try {
        const result = await api.post('/createRating', { data })

    } catch (error) {
        toast.error("Something went wrong , Please try again")
        console.log(error)
        throw error
    }
}