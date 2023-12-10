import React, { useState } from 'react'
import InputPersonal from '../../Input/InputPersonal/InputPersonal'
import { useDispatch, useSelector } from 'react-redux'
import { EditUserInfo } from '../../../api/User'
import { toast } from 'react-toastify'
import { setUserInfo } from '../../../store/slices/AuthSlice'


const Name = ({ firstName, lastName }) => {

    const dispatch = useDispatch()

    const [item, setItem] = useState('')
    const [toggle, setToggle] = useState(false)
    const [FirstName, setFirstName] = useState(firstName)
    const [LastName, setLastName] = useState(lastName)


    const handleChangeFirstName = (value) => {
        setFirstName(value)
    }
    const handleChangeLastName = (value) => {
        setLastName(value)
    }
    const handleClose = () => {
        setToggle(false)
        setItem('')
        if (FirstName !== firstName || LastName !== lastName) {
            setFirstName(firstName)
            setLastName(lastName)
        }
    }
    const handleSave = async () => {
        const UserInfo = JSON.parse(localStorage.getItem('UserInfo'))
        const result = await EditUserInfo(UserInfo.user.email, FirstName, LastName)
        console.log(result)
        if (result) {
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
                                Legal name
                            </span>
                            <span className='text-[14px] text-[#717171]'>
                                This is the name on your travel document, which could be a license or a passport.
                            </span>
                        </div>
                        <div onClick={handleClose}>
                            <span className='text-[14px] underline font-semibold'>
                                Cancel
                            </span>
                        </div>

                    </div>
                    <div className='flex gap-5'>
                        <InputPersonal title={"First name"} value={FirstName} setValue={handleChangeFirstName} item={item} setItem={setItem} />
                        <InputPersonal title={"Last name"} value={LastName} setValue={handleChangeLastName} item={item} setItem={setItem} />
                    </div>
                    <button
                        onClick={handleSave}
                        className='py-[14px] px-[24px] bg-black text-white rounded-lg mt-4'>
                        Save
                    </button>
                </div>
            ) : (
                <div className='flex justify-between border-b-[0.5px]'>
                    <div className='flex flex-col py-[24px]'>
                        <span className='text-[16px]'>
                            Legal name
                        </span>
                        <span className='text-[14px] text-[#717171]'>
                            {firstName} {" "} {lastName}
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

export default Name