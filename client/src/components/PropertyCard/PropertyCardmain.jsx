import React, { useCallback, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillStar } from 'react-icons/ai'
import { Pagination, Navigation } from 'swiper/modules'

import { useSelector, useDispatch } from 'react-redux'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import "./PropertyCardmain.css"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import HeartButton from '../HeartButton/HeartButton';
import Rating from '../Rating/Rating';
import Rating2 from '../Rating/Rating2';
import { FaStar } from 'react-icons/fa';
const PropertyCardmain = ({ card, number, reservation, onAction, onAction2 }) => {

    const [rating, setRating] = useState(null)

    const { userInfo, authenticated } = useSelector((state) => state.auth)

    const starts = useMemo(() => {
        if (card?.Rating?.length === 0) {
            return 0; // Trả về 0 nếu không có đánh giá nào
        }
        const totalStars = card?.Rating?.reduce((acc, obj) => acc + obj.stars, 0);
        return (totalStars / card?.Rating?.length).toFixed(1);
    }, [card])

    const handleCancel = useCallback((e) => {
        e.stopPropagation();
        onAction(reservation.id)
    }, [onAction])
    console.log(userInfo)

    const handleRating = useCallback((e, rating) => {
        const data = {
            userId: userInfo.user.id,
            ResidencyId: card.id,
            ReservationId: reservation.id,
            stars: rating,
        }
        e.stopPropagation();
        onAction2(data)
    }, [onAction2])

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
            <div className=' flex flex-col gap-2 relative'>
                <div className='relative Swiper-card '>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        slidesPerView={1}
                        navigation={{
                            nextEl: `.swiper-button-next-${number}`,
                            prevEl: `.swiper-button-prev-${number}`
                        }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className={`mb-[12px] z-0 `}
                    >
                        {Array.isArray(card.photos) && (
                            card.photos.map(photo => (
                                <SwiperSlide key={photo} className=''>
                                    <img src={photo.url} className='h-[250px] w-[100%] object-cover rounded-lg' />
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
                {authenticated ? <HeartButton ResidencyId={card.id} currentUser={userInfo.user} /> : <HeartButton />}


                <Link to={`/all-properties/${card.id}`}>
                    <div
                        className='flex justify-between'>
                        <div className='flex flex-col'>
                            <span className='break-all col-span-3 font-semibold'>{card.mapData?.region ? card?.mapData?.region + ", " + card?.mapData?.country : card?.mapData?.place + ", " + card?.mapData?.country}</span>
                            <span className='col-span-3 text-[#717171]'>{card.locationType?.name} views</span>
                            {revervationDate && (
                                <span className='col-span-3 text-[#717171]'>{revervationDate}</span>
                            )}

                            <span className='col-span-3'>
                                <span className='font-semibold'>{price}$</span> night
                            </span>
                        </div>
                        {!reservation && (
                            <div className='flex justify-start items-start  gap-2'>
                                {starts}
                                <FaStar className='mt-[0.7px]' />
                            </div>
                        )}
                    </div>
                </Link>

                {reservation && reservation?.Status !== "Success" && (
                    <button onClick={handleCancel} className='bg-airbnb-theme-color text-white py-1 flex justify-center rounded-[10px]'>
                        Cancel Reservation
                    </button>
                )}
                {reservation && reservation.Rating.length === 0 && reservation?.Status === "Success" && (
                    <Rating2 rating={rating} setRating={setRating} onRating={handleRating} />
                )}
                {reservation && reservation.Rating.length === 1 && reservation?.Status === "Success" && (
                    <Rating stars={reservation.Rating[0].stars} />
                )}
            </div>
        </div>
    )
}

export default PropertyCardmain