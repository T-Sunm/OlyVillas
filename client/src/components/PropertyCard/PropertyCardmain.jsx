import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillStar } from 'react-icons/ai'
import { Pagination, Navigation } from 'swiper/modules'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import "./PropertyCardmain.css"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const PropertyCardmain = ({ card, number }) => {
    return (
        <div className='rounded-[15px] overflow-hidden'>
            <div className=''>
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
                        <SwiperSlide>
                            <img src='./hero-image1.png' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='./hero-image1.png' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src='./hero-image1.png' />
                        </SwiperSlide>
                    </Swiper>
                    <div className={`swiper-button-prev-${number} prev absolute top-[50%] left-0 z-10 bg-white rounded-full p-2 `}>
                        <IoIosArrowBack />
                    </div>
                    <div className={`swiper-button-next-${number} next absolute top-[50%] right-0 z-10 bg-white rounded-full p-2 `}>
                        <IoIosArrowForward />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <span className='break-all col-span-3 font-semibold'>Ngũ hành sơn , Vietnam</span>
                        <span className='col-span-3 text-[#717171]'>{card.locationType} views</span>
                        <span className='col-span-3'>
                            <span className='font-semibold'>{card.price}$</span> night
                        </span>
                    </div>
                    <span className='flex'>{card.star} <AiFillStar /></span>
                </div>
            </div>
        </div>
    )
}

export default PropertyCardmain