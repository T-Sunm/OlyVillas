import React, { useMemo, useState } from 'react'
import { your_resevation } from '../../utils/Hosting'
import { LuCalendarCheck2 } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { getReservation, updateReservation } from '../../utils/api';
import ReservationCard from '../../components/PropertyCard/ReservationCard';
import { toast } from 'react-toastify';
import { differenceInDays, parseISO } from 'date-fns';
import Navigation from '../../components/Header/Navigation';
import Headerhosting from '../../components/Header/Headerhosting';
const Hosting = () => {

    const [statusReversation, setStatusReversation] = useState('Pending')

    const { user } = useSelector((state) => state?.auth?.userInfo)

    const params = {
        authorEmail: user?.email
    };

    const { data: dataReservation, isLoadingReservation, isError: ReservationError } = useQuery(["hosting", user?.email], () => getReservation(params))

    const { mutate: mutateAcceptReservation } = useMutation({
        mutationFn: (id) => updateReservation(id),
        onError: ({ response }) => toast.error(response?.data?.message, { position: "bottom-right" }),
        onSettled: () => {
            toast.success('Reservation Accept success')
            queryClient.invalidateQueries(["hosting", user?.email])
        }
    })

    console.log(dataReservation)

    const FilteReservation = useMemo(() => {
        if (dataReservation) {
            let reservations = []
            if (statusReversation === "Cancel Reservations") {
                reservations = dataReservation.filter((reservation) => {
                    return reservation.Status === "Cancel Reservations"
                })
            }
            if (statusReversation === "Pending") {
                reservations = dataReservation.filter((reservation) => {
                    return reservation.Status === "Pending"
                })
            }

            let filterreservations = dataReservation.filter((reservation) => {
                return reservation.Status === "Success"
            })
            if (statusReversation === "Checking out") {
                const currentDate = new Date();
                reservations = filterreservations.filter((reservation) => {
                    const startDate = parseISO(reservation.startDate);
                    const newDayCount = differenceInDays(startDate, currentDate);
                    console.log(newDayCount)
                    return newDayCount >= 1 && newDayCount <= 2
                })
            }
            if (statusReversation === "Currently hosting") {
                const currentDate = new Date();
                reservations = filterreservations.filter((reservation) => {
                    const endDate = parseISO(reservation.endDate);
                    const EndDayCount = differenceInDays(endDate, currentDate);
                    return EndDayCount >= 0
                })
            }
            return reservations
        } else {
            return []
        }


    }, [dataReservation, statusReversation])

    console.log(FilteReservation)

    return (
        <>
            <Headerhosting />
            <div className='flex flex-col gap-2 px-[80px] pt-[64px]'>
                <h2 className='text-3xl font-medium'>
                    Welcome back,Minh
                </h2>
                <div className='flex flex-col gap-10'>
                    <h2 className='text-2xl font-medium'>
                        Your reservations
                    </h2>
                    <div className='flex flex-col gap-8' >
                        <div className='flex gap-2'>
                            {your_resevation.map(type => (
                                <button
                                    onClick={() => setStatusReversation(type.title)}
                                    className={`px-[16px] py-[9px] border ${statusReversation === type.title ? 'border-black' : ''}  rounded-3xl text-[14px]`}>{type.title}</button>
                            ))}
                        </div>
                        {statusReversation === "Currently hosting" && FilteReservation.length === 0 && (
                            <div className='flex justify-center items-center h-[200px] bg-[#F7F7F7] rounded-lg'>
                                <div className='w-[200px] flex flex-col justify-center items-center'>
                                    <LuCalendarCheck2 size={35} className='mb-[24px]' />
                                    <span className='break-normal text-center text-[14px]'>
                                        You don’t have any guests staying with you right now.
                                    </span>
                                </div>
                            </div>
                        )}
                        {statusReversation === "Checking out" && FilteReservation.length === 0 && (
                            <div className='flex justify-center items-center h-[200px] bg-[#F7F7F7] rounded-lg'>
                                <div className='w-[200px] flex flex-col justify-center items-center'>
                                    <LuCalendarCheck2 size={35} className='mb-[24px]' />
                                    <span className='break-normal text-center text-[14px]'>
                                        You don’t have any guests checking out today or tomorrow.
                                    </span>
                                </div>
                            </div>
                        )}
                        {statusReversation === "Cancel Reservations" && FilteReservation.length === 0 && (
                            <div className='flex justify-center items-center h-[200px] bg-[#F7F7F7] rounded-lg'>
                                <div className='w-[200px] flex flex-col justify-center items-center'>
                                    <LuCalendarCheck2 size={35} className='mb-[24px]' />
                                    <span className='break-normal text-center text-[14px]'>
                                        You don’t have any guests cancel.
                                    </span>
                                </div>
                            </div>
                        )}
                        {statusReversation === "Pending" && FilteReservation.length === 0 && (
                            <div className='flex justify-center items-center h-[200px] bg-[#F7F7F7] rounded-lg'>
                                <div className='w-[200px] flex flex-col justify-center items-center'>
                                    <LuCalendarCheck2 size={35} className='mb-[24px]' />
                                    <span className='break-normal text-center text-[14px]'>
                                        You don’t have any guests waiting for approval right now.
                                    </span>
                                </div>
                            </div>
                        )}
                        {FilteReservation && (
                            <div className='grid grid-cols-5 gap-3'>
                                {FilteReservation.map((Reservation, index) => (
                                    <ReservationCard card={Reservation.Residency} number={index} reservation={Reservation} onActionAccept={mutateAcceptReservation} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hosting