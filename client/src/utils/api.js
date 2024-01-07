import axios from 'axios'
import { toast } from 'react-toastify'


export const api = axios.create({
    baseURL: "http://localhost:8080/api/"
})

export const checkUser = async (email) => {
    try {
        const result = await api.post(`user/verifyEmail`, { email })
        return result
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}
export const login = async (email, password) => {
    try {
        const result = await api.post(`user/login`, { email, password })
        if (result.status === 401 || result.status === 500) {
            throw result.data
        }
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}
export const createUser = async (email, password, firstName, lastName) => {
    try {
        const result = await api.post(`user/register`, { email, password, firstName, lastName })
        return result.data
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}

export const createResidency = async (data, token) => {
    try {
        const res = await api.post('/user/createResidency',
            { data },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
    }
}
export const getAllProperties = async (params = {}) => {

    const { isOpen, ...searchWithoutIsOpen } = params;

    console.log(searchWithoutIsOpen)

    try {
        const response = await api.post("user/getResidencies", searchWithoutIsOpen)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}

export const getProperty = async (id) => {
    try {
        const response = await api.get(`user/getResidency/${id}`, {
            // đặt thời gian chờ là 10 giây , quá 10 giây là báo lỗi
            timeout: 10 * 1000
        })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export const createReservation = async (userId, ResidencyId, tripInfo, price, startDate, endDate) => {
    try {
        const response = await api.post('user/createReservation', { userId, ResidencyId, tripInfo, price, startDate, endDate })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export const getReservation = async (params) => {
    try {
        const response = await api.post("user/getReservations", { params })
        console.log(params)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export const deleteReservation = async (id) => {
    try {
        const response = await api.delete(`user/deleteReservations/${id}`)
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export const updateReservation = async (id) => {
    try {
        const response = await api.patch('user/updateReservation', { id })
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}