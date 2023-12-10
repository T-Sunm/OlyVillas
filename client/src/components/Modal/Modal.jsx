
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from './Button'

const Modal = ({ isOpen, onClose,
    onSubmit, title,
    body, footer, actionLabel, secondaryActionLabel,
    disabled, secondaryAction, }) => {

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }
        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return
        }
        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen || !showModal) {
        return null
    }
    return (
        <>
            <div className='justify-center items-center flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            bg-neutral-800/70
            '>
                <div className='relative 
                desktop:w-2/5 
                h-full
                my-6
                mx-auto
                laptop:w-3/6 
                laptop:h-auto
                tablet:w-4/6
                tablet:h-auto
                phone:w-full '>
                    {/* CONTENT */}
                    <div
                        className={`duration-300 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    >
                        <div
                            className='h-full laptop:h-auto tablet:h-auto border-0 
                            rounded-lg shadow-lg relative 
                            flex flex-col w-full 
                            bg-white outline-none focus:outline-none'
                        >
                            {/* HEADER */}
                            <div
                                className='
                                flex
                                items-center
                                p-6
                                rounded-t
                                justify-center
                                relative
                                border-b-[1px]
                            '
                            >
                                <button
                                    onClick={handleClose}
                                    className='
                                    p-1 border-0 
                                    hover:opacity-70
                                    transition
                                    absolute
                                    left-9

                                    '
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className='text-lg font-semibold'>
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className='relative p-6 flex-auto'>
                                {body}
                            </div>
                            {/* FOOTER  */}
                            <div className='flex flex-col gap-2 p-6'>
                                <div
                                    className='flex flex-row items-center gap-4 w-full'
                                >
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                            outline
                                        />
                                    )}
                                    <Button label={actionLabel} onClick={handleSubmit} disabled={disabled} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal