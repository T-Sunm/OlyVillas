import React from 'react'
import { useQuery } from 'react-query'
import { getProperty } from '../utils/api'

const useProperty = (propertyId) => {
    const { data, isLoading, isError, refetch, isSuccess } = useQuery(
        ["allProperties", propertyId],
        () => getProperty(propertyId),
        {
            refetchOnWindowFocus: false
        }
    );

    return {
        data,
        isError,
        isLoading,
        refetch, isSuccess
    }
}

export default useProperty