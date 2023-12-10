import React, { useState } from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const Rating = ({ stars }) => {
    console.log(stars)
    return (
        <div className='flex'>
            {[...Array(5)].map((star, index) => {
                let number = index + 0.5
                return (
                    <span key={index}>
                        {stars >= index + 1 ? (
                            <FaStar color='#ffc107' size={30} />
                        ) : stars >= number ? (
                            <FaStarHalfAlt color='#ffc107' size={30} />
                        ) : (
                            <AiOutlineStar size={30} />
                        )

                        }
                    </span>
                )
            })}
        </div>
    )
}

export default Rating