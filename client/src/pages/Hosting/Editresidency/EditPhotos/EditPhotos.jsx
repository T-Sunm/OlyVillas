import React from 'react'
import { HiXMark } from 'react-icons/hi2'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { deleteImageResy } from '../../../../api/Residency'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditPhotos = () => {

    const photos = useSelector((state) => state.EditProp.photos)
    const { propertyId } = useParams()
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: ({ public_id, propertyId: mutationPropertyId }) => deleteImageResy(mutationPropertyId, public_id),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            toast.success("Added Successfully", { position: "bottom-right" })
            queryClient.invalidateQueries(["allProperties"])

        }
    })

    const removePhoto = (public_id) => {
        mutate({ public_id, propertyId })

    }

    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <span className='text-[18px] font-semibold'>
                        All photos
                    </span>
                    <span className='text-[#888888] text-[14px] mt-[4px] '>
                        <p className='line-clamp-2'>
                            Drag and drop your photos to change the order.
                        </p>
                    </span>
                </div>
                <div>
                    <button className='py-[7px] px-[15px] border border-black rounded-lg font-semibold text-[14px]'>
                        Upload photos
                    </button>
                </div>
            </div>
            <ul className='py-10 grid grid-cols-3 gap-5 '>
                {photos && photos.map((file, i) => (
                    <li key={i} className='relative h-full w-full rounded-md shadow-lg'>
                        <img
                            src={file.url}
                            className='h-full w-full object-contain rounded-md'
                        />
                        <button
                            type='button'
                            className='w-7 h-7 border border-secondary-400 bg-airbnb-theme-color rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                            onClick={() => removePhoto(file.public_id)}
                        >
                            <HiXMark className='w-5 h-5 fill-white hover:fill-black transition-colors ' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EditPhotos