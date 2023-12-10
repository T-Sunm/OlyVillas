import React from 'react'
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'

const useProperties = (params) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['allProperties'],
        queryFn: getAllProperties,
        refetchOnWindowFocus: false
    })
    return {
        data,
        isError,
        isLoading,
        refetch
    }
}

export default useProperties