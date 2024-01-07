import React from 'react'
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'

const useProperties = (params = {}) => {
    const { data, isLoading, isError, refetch } = useQuery(
        ["allProperties", params], // Sử dụng params làm phần của khóa truy vấn
        () => getAllProperties(params), // Truyền params vào hàm getAllProperties
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Do not refetch when the component mounts
        }
    );
    return {
        data,
        isError,
        isLoading,
        refetch
    }
}

export default useProperties