import React from 'react'
import {AiFillHeart} from 'react-icons/ai'
const PropertyCard = ({card}) => {
  return (
    <div className="flexColStart r-card  gap-[0.6rem] p-[1rem] rounded-[10px] max-w-max m-auto transition-all ease-in duration-300 relative">
        <AiFillHeart size={24} color='white' className='absolute top-5 right-7'/>
        <img src={card.image} className='w-full max-w-[15rem]' alt="home" />
        <span className="text-secondaryText text-[1.2rem] font-semibold">
          <span style={{ color: "orange" }} className=''>$</span>
          <span>{card.price}</span>
        </span>
        <span className="text-primaryText text-[1.5rem] font-bold">{card.name}</span>
        <span className="text-secondaryText text-[0.7rem] w-[15rem]">{card.detail}</span>
    </div>
  )
}

export default PropertyCard