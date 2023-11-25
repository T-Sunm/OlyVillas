import React from 'react'
import { CiTrash } from "react-icons/ci";
import { useMutation, useQueryClient } from 'react-query';
import { DeleteResidency } from '../../api/Residency';
import Lds_roller from '../Lds-roller/Lds-roller';

const ActionHosting = ({ params, rowID, setRowID }) => {
    const queryClient = useQueryClient();
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: (id) => DeleteResidency(id),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            queryClient.invalidateQueries(['allProperties'])
        }
    })


    return (
        <div className=''>
            {!isLoading && !isError && (
                <CiTrash aria-disabled={params.id !== rowID || isLoading}
                    size={24} onClick={() => mutate(params.id)} />
            )}
            {isLoading && (
                <Lds_roller />
            )}
        </div>
    )
}

export default ActionHosting