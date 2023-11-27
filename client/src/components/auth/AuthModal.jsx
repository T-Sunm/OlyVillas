import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import { setAuthModalFalse, setAuthModalTrue, setToggleModal, setUserInfo } from '../../store/slices/AuthSlice'
import { checkUser, createUser, login } from '../../utils/api'
import FormInput from './FormInput/FormInput'

const AuthModal = ({ toggle, setToggle }) => {
    const { isAuth, toggleAuthenticated, userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userFound, setUserFound] = useState(null)

    const verifyEmail = async () => {
        const result = await checkUser(email);
        console.log(result)
        if (result.data.user === true) {
            setUserFound(true)
        } else {
            setUserFound(false)
        }

    }

    const handleLogin = async () => {
        const result = await login(email, password)
        console.log(result)
        if (result) {
            localStorage.setItem("UserInfo", JSON.stringify(result))
            dispatch(setAuthModalTrue())
            dispatch(setToggleModal(false))
            dispatch(setUserInfo(result))
        }
    }

    const handleSignup = async () => {
        const result = await createUser(email, password, firstName, lastName)
        console.log(result)
        if (result) {
            dispatch(setToggleModal(false))
            dispatch(setAuthModalTrue())
            dispatch(setUserInfo(result.user))
        }
    }

    return (
        <div className='relative z-50'>
            <div className='fixed inset-0 bg-gray-300 opacity-75'></div>
            <div className='fixed inset-0 z-10 overscroll-y-auto'>
                {/* khi không có items-center thì height div nó sẽ trải dài full vì align-items mặc định sẽ là stretch*/
                    // khi có item-center thì nó sẽ co fit lại nằm ở giữa

                    // width và height element này sẽ phụ thuộc vào số lượng phần tử
                    // nó sẽ tự co dãn để nằm ở giữa vì vậy kh cần set-width và set-height
                }
                <div className='flex min-h-full justify-center items-center '>
                    <div className='relative transform overflow-hidden rounded-lg bg-white'>
                        <div className='bg-white pb-4 pt-5'>
                            <div className='relative border-b border-b-gray-300 flex justify-center items-center pb-5'>
                                <span
                                    onClick={() => dispatch(setToggleModal(false))}
                                    className='absolute left-5 cursor-pointer text-lg'>
                                    <IoMdClose />
                                </span>
                                <span>
                                    Log in or sign up
                                </span>
                            </div>
                            <div className='p-5'>
                                <h3 className='text-xl pb-5'>Welcom to AirBnb</h3>
                                {
                                    userFound === null
                                    && <div>
                                        <FormInput name="email" placeholder="Email" value={email} setValue={setEmail} />

                                    </div>
                                }
                                {
                                    userFound === true
                                    && <div>
                                        <FormInput name="password" placeholder="password" value={password} setValue={setPassword} />
                                    </div>
                                }
                                {userFound === false
                                    && <div className='flex flex-col gap-3'>
                                        <FormInput name="firstName" placeholder="FirstName" value={firstName} setValue={setFirstName} />
                                        <FormInput name="lastname" placeholder="LastName" value={lastName} setValue={setLastName} />
                                        <FormInput name="password" placeholder="password" value={password} setValue={setPassword} />
                                    </div>
                                }
                                <button
                                    onClick={
                                        userFound === null ?
                                            verifyEmail :
                                            userFound ?
                                                handleLogin :
                                                handleSignup
                                    }
                                    className='bg-airbnb-theme-color w-full py-3 mt-5 text-white text-lg font-medium rounded-md' >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthModal