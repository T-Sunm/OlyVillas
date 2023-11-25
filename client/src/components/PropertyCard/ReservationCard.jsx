import React, { useCallback, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillStar } from 'react-icons/ai'
import { Pagination, Navigation } from 'swiper/modules'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import "./PropertyCardmain.css"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ReservationCard = ({ card, number, reservation, onActionAccept }) => {

    const navigate = useNavigate()

    const handleAccept = useCallback((e) => {
        e.stopPropagation();
        onActionAccept(reservation.id)
        console.log(reservation.id)
    }, [reservation])

    const revervationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.price
        }
        return card.price
    })
    return (
        <div
            className='rounded-[10px] overflow-hidden'>
            <div className=' flex flex-col gap-2'>
                <div className='relative Swiper-card'>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        slidesPerView={1}
                        navigation={{
                            nextEl: `.swiper-button-next-${number}`,
                            prevEl: `.swiper-button-prev-${number}`
                        }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className={`mb-[12px] z-0  `}
                    >
                        {Array.isArray(card.photos) && (
                            card.photos.map(photo => (
                                <SwiperSlide key={photo}>
                                    <img src={photo} />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                    <div className={`swiper-button-prev-${number} prev absolute top-[50%] left-0 z-10 bg-white rounded-full p-2 `}>
                        <IoIosArrowBack />
                    </div>
                    <div className={`swiper-button-next-${number} next absolute top-[50%] right-0 z-10 bg-white rounded-full p-2 `}>
                        <IoIosArrowForward />
                    </div>
                </div>
                <div
                    onClick={() => navigate(`../properties/${card.id}`)}
                    className='flex justify-between'>
                    <div className='flex flex-col'>
                        <span className='break-all col-span-3 font-semibold'>Ngũ hành sơn , Vietnam</span>
                        <span className='col-span-3 text-[#717171]'>{card.locationType} views</span>
                        {revervationDate && (
                            <span className='col-span-3 text-[#717171]'>{revervationDate}</span>
                        )}

                        <span className='col-span-3'>
                            <span className='font-semibold'>{price}$</span> night
                        </span>
                    </div>
                    <span className='flex'>{card.star} <AiFillStar /></span>
                </div>
                {reservation.Status === "Pending" && (
                    <div className='grid grid-cols-2 gap-1'>
                        <button className='bg-airbnb-light-black text-white py-1 flex justify-center rounded-[10px]'>
                            Cancel
                        </button>
                        <button onClick={handleAccept} className='bg-airbnb-theme-color text-white py-1 flex justify-center rounded-[10px]'>
                            Accept
                        </button>
                    </div>

                )}
            </div>
        </div>
    )
}

export default ReservationCard