import axios from "axios";
import { toast } from "react-toastify";

import { QueryClient } from 'react-query'
export const queryClient = new QueryClient()


export const api = axios.create({
    baseURL: "http://localhost:8080/api/user"
})

export const ViewDetailsReservation = async (reservationID) => {
    try {
        const result = await api.post(`/getDetailsReservation`, { reservationID })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const GetEarning = async (month, year, userEmail) => {
    try {
        const result = await api.post(`/getEarnings`, { month, year, userEmail })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}
export const GetEarningWithYear = async (year, userEmail) => {
    try {
        const result = await api.post(`/getEarningsWithYear`, { year, userEmail })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}