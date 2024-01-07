import React, { useMemo, useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { getRatingbyauthorEmail } from '../../api/Rating';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Rating from '../../components/Rating/Rating';
import PropertiesModal from '../../components/Modal/PropertiesModal';
import useProperties from '../../hooks/useProperties';

const Reviews = () => {
    const [toggle, setToggle] = useState(false)
    const userInfo = useSelector((state) => state.auth.userInfo)
    const [title, setTitle] = useState("All listings")
    const [residencyId, setResydencyId] = useState()

    const params = useMemo(() => {
        return {
            authorEmail: userInfo?.user?.email
        };
    }, [userInfo]);

    const { data, isLoading, isError, refetch } = useQuery(
        ["getRating", userInfo.user.email, residencyId],
        () => getRatingbyauthorEmail(userInfo.user.email, residencyId),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Do not refetch when the component mounts
        }
    );

    const { data: allProperties, isError: error2, isLoading: loading2 } = useProperties(params)

    const handleSetResidencyId = (id, title) => {
        if (id === 0) {
            setResydencyId()
            setToggle(false)
            setTitle("All listings")
        }
        else {
            setResydencyId(id)
            setToggle(false)
            setTitle(title)
        }

    }
    console.log(residencyId)
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className=''>
                    <div className='flex flex-col items-start justify-start'>
                        <div className='text-start'>
                            <span className='text-[32px] font-semibold'>
                                Reviews
                            </span>
                        </div>
                        <div
                            onClick={() => setToggle(true)}
                            className='flex justify-center items-center mt-4'>
                            <span className='text-[16px] font-medium'>
                                {title}
                            </span>
                            <IoMdArrowDropdown />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col my-[40px] gap-3'>
                    {data?.map((item) => {
                        const date = parseISO(item.createdAt);
                        const timeAgo = formatDistanceToNow(date);
                        return (
                            <div className='flex flex-col gap-7 border p-5 rounded-lg'>
                                <div className='flex flex-col'>
                                    <span className='text-[15px] font-semibold'>{item?.User?.firstName} {" "} {item?.User?.lastName}</span>
                                    <span className='text-[13px]'>post at {timeAgo} ago</span>
                                </div>
                                <div>
                                    <span>{item?.Residency?.title}</span>
                                    <img width={630} src={item?.Residency?.photos[0]?.url} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        Rating :
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Rating stars={item?.stars} />
                                        <span>({item?.stars})</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {toggle && (
                <PropertiesModal data={allProperties} setToggle={setToggle} onAction={handleSetResidencyId} />
            )}
        </>
    )
}

export default Reviews