import React, { useState } from 'react'
import InputPersonal from '../../Input/InputPersonal/InputPersonal'
import { EditEmail, EditUserInfo } from '../../../api/User'
import { setUserInfo } from '../../../store/slices/AuthSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const Email = ({ email }) => {
    const [item, setItem] = useState('')
    const [toggle, setToggle] = useState(false)
    const [Email, setEmail] = useState(email)

    const dispatch = useDispatch()
    const handleChangeEmail = (value) => {
        setEmail(value)
    }

    const handleClose = () => {
        setToggle(false)
        setItem('')
        if (Email !== email) {
            setEmail(email)

        }
    }
    const handleSave = async () => {
        const result = await EditEmail(Email, email)
        console.log(result)
        if (result) {
            localStorage.setItem("UserInfo", JSON.stringify(result))
            dispatch(setUserInfo(result))
            toast.success("Succes")
        }

        // update lại textfield
        setToggle(false)
    }
    return (
        <>
            {toggle ? (
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col py-[24px]'>
                            <span className='text-[16px]'>
                                Email address
                            </span>
                            <span className='text-[14px] text-[#717171]'>
                                Use an address you’ll always have access to.
                            </span>
                        </div>
                        <div onClick={handleClose}>
                            <span className='text-[14px] underline font-semibold'>
                                Cancel
                            </span>
                        </div>

                    </div>
                    <div className='flex gap-5'>
                        <InputPersonal title={"Email address"} value={Email} setValue={handleChangeEmail} item={item} setItem={setItem} />
                    </div>
                    <button
                        onClick={handleSave}
                        className='py-[14px] px-[24px] bg-black text-white rounded-lg mt-4'>
                        Save
                    </button>
                </div>
            ) : (
                <div className='flex justify-between border-b-[0.5px] items-center'>
                    <div className='flex flex-col py-[24px]'>
                        <span className='text-[16px]'>
                            Email address
                        </span>
                        <span className='text-[14px] text-[#717171]'>
                            {email}
                        </span>
                    </div>
                    <div onClick={() => setToggle(true)}>
                        <span className='text-[14px] underline font-semibold'>
                            Edit
                        </span>
                    </div>

                </div>
            )}
        </>
    )
}

export default Email