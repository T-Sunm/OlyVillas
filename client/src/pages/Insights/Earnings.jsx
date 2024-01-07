import React, { useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import SelectInput from '../../components/SelectInput/SelectInput';
import { useQuery } from 'react-query';
import { GetEarning, GetEarningWithYear } from '../../api/Reservation';
import { useSelector } from 'react-redux';
import EarningsAreaChart from '../../components/chart/AreaChart/EarningsAreaChart';

const Earnings = () => {
    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth() + 1)
    const [year, setYear] = useState(currentDate.getFullYear())

    const userInfo = useSelector((state) => state.auth.userInfo)

    console.log(userInfo)
    // khi đặt các biến làm params làm truy vấn thì mỗi khi nó thay đổi thì sẽ tự rerender lại
    const { data, isLoading, isError, refetch } = useQuery(
        ["getEarnings", month, year, userInfo.user.email],
        () => GetEarning(month, year, userInfo.user.email),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Do not refetch when the component mounts
        }
    );
    const { data: earningsYear, isLoading: loading2, isError: error2 } = useQuery(
        ["getEarnings", year, userInfo.user.email],
        () => GetEarningWithYear(year, userInfo.user.email),
        {
            refetchOnWindowFocus: false,
        }
    );

    console.log(earningsYear)

    const monthsObject = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };
    const yearsObject = {
        2023: 2023,
        2024: 2024,
        2025: 2025,
        2026: 2026,
        2027: 2027,
        2028: 2028,
        2029: 2029,
        2030: 2030,
        2031: 2031,
        2032: 2032,
        2033: 2033,
        2034: 2034,
        2035: 2035
    };

    return (
        <>
            <div className='w-[70%]'>
                <div className='flex gap-4 mb-[48px]'>
                    <SelectInput title={"Select month"} data={monthsObject} value={month} setValue={setMonth} />
                    <SelectInput title={"Select year"} data={yearsObject} value={year} setValue={setYear} />
                </div>
                <div className='flex flex-col'>
                    <span className='text-[#484848] text-[48px] font-semibold'>
                        ${data?.totalEarnings}
                    </span>
                    <span className='text-[16px] font-mono'>
                        Booked earnings for {monthsObject[month]},{year}
                    </span>
                </div>
            </div>
            <div>
                <div className='py-[32px]'>
                    <span className='text-[24px] font-semibold'>{year} earnings chart</span>
                </div>
                <EarningsAreaChart data={earningsYear?.reservations} />
            </div>
        </>
    )
}

export default Earnings