import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { queryClient, updateResidency } from '../api/Residency'
import { useSelector } from 'react-redux'

const useEditProp = () => {


    const stateEdit = useSelector((state) => {
        const { preLocationData, preMapData, photos, ...rest } = state.EditProp;
        return rest;
    });
    const { mutate: mutateEditResidency } = useMutation({
        mutationFn: (id) => updateResidency(id, stateEdit),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            toast.success('Edit success')
            queryClient.invalidateQueries({ queryKey: ["allProperties"] })
        }
    })
    const editProperty = (propertyId) => {
        mutateEditResidency(propertyId);
    }

    return { editProperty };
}

export default useEditProp