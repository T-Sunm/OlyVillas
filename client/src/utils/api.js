import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

export const api = axios.create({
    baseURL:"http://localhost:8080/api/user"

})

export const getAllProperties = async()=>{
    try {
        const response = await api.get("/getResidencies",{
            // đặt thời gian chờ là 10 giây , quá 10 giây là báo lỗi
            timeout:10 * 1000
        })
        if (response.status === 400 || response.status=== 500){
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}