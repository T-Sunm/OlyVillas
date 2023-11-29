import React, { useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { useMutation, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { deleteImageResy, queryClient, updateImageResy } from '../../../../api/Residency'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useProperty from '../../../../hooks/useProperty'
import { setPhotos } from '../../../../store/slices/EditPropSlice'

const EditPhotos = () => {
    const { propertyId } = useParams()
    const { data, isLoading, isError, isSuccess } = useProperty(propertyId)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    if (isSuccess) {
        dispatch(setPhotos(data.photos))
    }
    const photos = useSelector((state) => state.EditProp.photos)
    console.log(photos)
    const { mutate: mutateUpdatePhoto } = useMutation({
        mutationFn: ({ photo, propertyId: mutationPropertyId }) => updateImageResy(mutationPropertyId, photo),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            toast.success("Added Successfully", { position: "bottom-right" })
            queryClient.invalidateQueries({ queryKey: ["allProperties"] })
            location.reload()
        }
    })

    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            mutateUpdatePhoto({ photo: reader.result, propertyId })
        }
    }

    const { mutate } = useMutation({
        mutationFn: ({ public_id, propertyId: mutationPropertyId }) => deleteImageResy(mutationPropertyId, public_id),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            toast.success("Added Successfully", { position: "bottom-right" })
            queryClient.invalidateQueries({ queryKey: ["allProperties"] })
            location.reload()
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
                    <button
                        onClick={handleButtonClick}
                        className='py-[7px] px-[15px] border border-black rounded-lg font-semibold text-[14px]'>
                        Upload photos
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileInputChange(e)}
                    />
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