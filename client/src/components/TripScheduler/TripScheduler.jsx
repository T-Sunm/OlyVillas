import React, { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { IoIosArrowDown } from "react-icons/io";
import './TripSchedule.css'
import format from 'date-fns/format'
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import guestData from '../../utils/guest';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate, setTripInfo as setTripInfoSlice } from '../../store/slices/Reservation';
import { setPrice } from '../../store/slices/Reservation';
import useDisplayTripSchedule from '../../hooks/useDisplayTripSchedule';
const TripScheduler = ({ price, mutate, dataReservation }) => {

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })


    const disableDates = useMemo(() => {
        let date = []
        if (dataReservation) {
            let ReservationNotCancel = dataReservation.filter((reservation) => {
                return reservation.Status !== "Cancel Reservations"
            })
            ReservationNotCancel.map(reservation => {
                const range = eachDayOfInterval({
                    start: new Date(reservation.startDate),
                    end: new Date(reservation.endDate)
                })
                date = [...date, ...range]
            })
        }

        return date
    }, [dataReservation])

    const [openDate, setOpenDate] = useState(false)
    const [openGuest, setOpenGuest] = useState(false)
    const [totalGuest, setTotalGuest] = useState(2)
    const [DayCount, setDayCount] = useState(1)
    const [tripInfo, setTripInfo] = useState({
        "Adults": 1,
        "Children": 1,
        "Infants": 1
    })

    const { ResidencyId, tripInfo: tripInfoSlice, price: priceSlice, startDate, endDate } = useSelector((state) => state.reservation)


    const displayTripschedule = useDisplayTripSchedule()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setStartDate(date.startDate.toISOString()))
        dispatch(setEndDate(date.endDate.toISOString()))
        const newDayCount = differenceInDays(date.endDate, date.startDate);
        setDayCount(newDayCount); // Cập nhật DayCount
        const newTotalPrice = price * newDayCount;
        dispatch(setPrice(newTotalPrice)); // Tính toán totalPrice sử dụng newDayCountotalPrice(DayCount * price)
    }, [date, price])

    useEffect(() => {
        dispatch(setTripInfoSlice(tripInfo))
        // Lấy tất cả các giá trị từ tripInfo và tính tổng
        let newTotalGuest = 0;
        for (const key in tripInfo) {
            if (key !== "Infants") {
                newTotalGuest += tripInfo[key];
            }
        }
        setTotalGuest(newTotalGuest)
    }, [tripInfo])

    const handleClick = () => {
        setOpenDate(!openDate)
    }

    const handleChange = (ranges) => {
        setDate(ranges.selection)
    }

    const handleDecrement = (guest) => {
        setTripInfo(prevTripInfo => ({
            ...prevTripInfo,
            [guest]: prevTripInfo[guest] > 0 ? prevTripInfo[guest] - 1 : 0
        }))
    }
    const handleIncrement = (guest) => {
        setTripInfo(prevTripInfo => ({
            ...prevTripInfo,
            [guest]: prevTripInfo[guest] + 1
        }))
    }

    const handleReverse = () => {
        mutate()
        setDayCount(0)
        setDate({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        })
    }
    return (
        <div className='sticky z-10 top-10'>
            <div className='bg-white rounded-xl border border-gray-200 p-[24px] flex flex-col gap-3'>
                <div className='flex flex-col items-start'>
                    <div className='flex gap-1 justify-start' >
                        <span className='text 2xl font-semibold'>$ {price}</span>
                        <span>night</span>
                    </div>
                </div>
                <div className='relative'>
                    <div className='container'>
                        <div className={`calender grid grid-cols-2  `} onClick={handleClick}>
                            <div className='flex flex-col p-[10px] '>
                                <span className='font-semibold text-[10px] '>
                                    CHECK-IN
                                </span>
                                <span className='text-gray-400 text-sm'>{date ? format(date.startDate, "MM/dd/yyyy") : 'Add date'}</span>
                            </div>
                            <div className='flex flex-col p-[10px] border border-l-black '>
                                <span className='font-semibold text-[10px]'>
                                    CHECKOUT
                                </span>
                                <span className='text-gray-400 text-sm'>{date ? format(date.endDate, "MM/dd/yyyy") : 'Add date'}</span>
                            </div>
                        </div>
                        <div className='flex border border-t-black justify-between items-center' onClick={() => setOpenGuest(!openGuest)}>
                            <div className='flex flex-col p-[10px] '>
                                <span className='font-semibold text-[10px] '>
                                    GUESTS
                                </span>
                                <span className='text-gray-400 text-sm'>{totalGuest} guest</span>
                            </div>
                            <div>
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>
                    {openDate && <DateRange
                        className='dateRange'
                        ranges={[date]}
                        onChange={handleChange}
                        minDate={new Date()}
                        direction='horizontal'
                        months={2}
                        disabledDates={disableDates}
                        moveRangeOnFirstSelection={false}
                        editableDateInputs={true}
                    />}
                    {openGuest && <div className='guest absolute bg-white w-[400px] p-4 rounded-lg'>
                        {guestData && guestData.map((guest) => (
                            <div key={guest.title} className='flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <span className='font-semibold'>
                                        {guest.title}
                                    </span>
                                    <span className='text-sm text-gray-600'>
                                        {guest.description}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center w-34'>
                                    <button
                                        onClick={() => handleDecrement(guest.title)}
                                        className='border border-gray-200 p-[10px] rounded-full hover:border-gray-500'>
                                        <AiOutlineMinus />
                                    </button>
                                    <div className='p-5 w-[50px] flex justify-center items-center'>
                                        {tripInfo[guest.title]}
                                    </div>
                                    <button
                                        onClick={() => handleIncrement(guest.title)}
                                        className='border border-gray-200 p-[10px] rounded-full hover:border-gray-500'>
                                        <AiOutlinePlus />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
                <button
                    onClick={handleReverse}
                    className='bg-airbnb-theme-color flex w-[100%] justify-center py-2 rounded-lg text-white font-semibold'>
                    Reverse
                </button>
                <div className='flex justify-between'>
                    <span className='underline'>${price} x {DayCount} nights</span>
                    <span>$ {priceSlice}</span>
                </div>
                <div className='h-[1px] bg-gray-400'>

                </div>
                <div className='flex justify-between font-semibold'>
                    <span className=''>Total before taxes </span>
                    <span>$ {priceSlice}</span>
                </div>
            </div>
        </div>
    )
}

export default TripScheduler