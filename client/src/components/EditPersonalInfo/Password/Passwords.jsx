import React, { useCallback, useMemo, useState } from 'react'
import InputPersonal from '../../Input/InputPersonal/InputPersonal'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { editPassword } from '../../../api/User'
import { useDispatch } from 'react-redux'

const Passwords = ({ updatedAt, email }) => {

    const [toggle, setToggle] = useState(false)

    const [item, setItem] = useState()

    const dispatch = useDispatch()

    const [currentPassword, setCurrentPassword] = useState()
    const [Password, setPassword] = useState()
    const [confirmPassword, setConFirmPassword] = useState()

    const handleUpdate = async () => {
        const result = await editPassword(email, currentPassword, Password)
        console.log(result)
        if (result) {
            localStorage.setItem("UserInfo", JSON.stringify(result))
            dispatch(setUserInfo(result))
            toast.success("Succes")
        }
    }

    const handleMatchPass = useCallback(() => {
        return Password !== confirmPassword || Password <= 5;
    }, [Password, confirmPassword]);

    const handleChangeCurrentPassword = (value) => {
        setCurrentPassword(value)
    }
    const handleChangePassword = (value) => {
        setPassword(value)
    }
    const handleChangeConfirmPassword = (value) => {
        setConFirmPassword(value)
    }



    const date = useMemo(() => parseISO(updatedAt), [updatedAt]);
    const timeAgo = useMemo(() => formatDistanceToNow(date), [date]);
    return (
        <>
            {toggle ? (
                <div className='border-b-[1px] pb-[24px]'>
                    <div className='flex justify-between items-center  '>
                        <div className='flex flex-col py-[24px]'>
                            <span className='text-[16px] font-semibold'>
                                Password
                            </span>
                        </div>
                        <div onClick={() => setToggle(false)}>
                            <span className='text-[14px] underline font-semibold'>
                                Cancel
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <InputPersonal type='password' title={"Current password"} value={currentPassword} setValue={handleChangeCurrentPassword} item={item} setItem={setItem} />
                        <InputPersonal type='password' title={"New password"} value={Password} setValue={handleChangePassword} item={item} setItem={setItem} />
                        <InputPersonal type='password' title={"Confirm password"} value={confirmPassword} setValue={handleChangeConfirmPassword} item={item} setItem={setItem} />
                    </div>
                    <button
                        disabled={handleMatchPass()}
                        onClick={handleUpdate}
                        className='py-[14px] px-[24px] bg-[#008489] text-white rounded-lg mt-4 font-semibold disabled:opacity-70 '>
                        Update password
                    </button>
                </div>
            ) : (
                <div className='flex justify-between border-b-[0.5px] items-center'>
                    <div className='flex flex-col py-[24px]'>
                        <span className='text-[16px] font-semibold'>
                            Password
                        </span>
                        <span className='text-[14px] text-[#717171]'>
                            Last updated {timeAgo} ago
                        </span>
                    </div>
                    <div onClick={() => setToggle(true)}>
                        <span className='text-[14px] underline font-semibold'>
                            Update
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}

export default Passwords