import React from 'react'
import { CiTrash } from "react-icons/ci";
import { useMutation, useQueryClient } from 'react-query';
import { DeleteResidency } from '../../api/Residency';
import Lds_roller from '../Lds-roller/Lds-roller';
import { useSelector } from 'react-redux';

const ActionHosting = ({ params, rowID, setRowID }) => {
    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    const queryClient = useQueryClient();
    const { mutate, isLoading, isError } = useMutation({
        mutationFn: ({ id, email }) => DeleteResidency(id, email),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            queryClient.invalidateQueries(['allProperties'])
        }
    })


    return (
        <div className=''>
            {!isLoading && !isError && (
                <CiTrash aria-disabled={params.id !== rowID || isLoading}
                    // truyền cho mutate 
                    size={24} onClick={() => mutate({ id: params.id, email: userInfo.user.email })} />
            )}
            {isLoading && (
                <Lds_roller />
            )}
        </div>
    )
}

export default ActionHosting