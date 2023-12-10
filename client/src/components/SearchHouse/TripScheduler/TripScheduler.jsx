import React, { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './TripSchedule.css'
import format from 'date-fns/format'
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '../../../store/slices/SearchSlice';


const TripScheduler = () => {

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const [DayCount, setDayCount] = useState(1)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setStartDate(date.startDate.toISOString()))
        dispatch(setEndDate(date.endDate.toISOString()))
        const newDayCount = differenceInDays(date.endDate, date.startDate);
        setDayCount(newDayCount); // Cập nhật DayCount
    }, [date])

    const handleChange = (ranges) => {
        setDate(ranges.selection)
    }

    return (
        <div className=''>
            <div className='bg-white rounded-xl border border-gray-200  flex flex-col gap-3 h-[50vh]'>
                <div className=''>
                    <div className='container-search'>
                        <div className={`calender grid grid-cols-2  `}>
                            <div className='flex flex-col p-[10px] border '>
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
                        <DateRange
                            className='dateRangeSearch'
                            ranges={[date]}
                            onChange={handleChange}
                            minDate={new Date()}
                            direction='horizontal'
                            months={2}
                            moveRangeOnFirstSelection={false}
                            editableDateInputs={true}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TripScheduler