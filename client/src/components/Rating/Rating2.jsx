import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './Rating.css'
const Rating2 = ({ rating, setRating, onRating }) => {

    const [hover, setHover] = useState(null)
    return (
        <div className='rating2 flex'>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1
                return (
                    <label key={index}>
                        <input
                            type='radio'
                            name='rating'
                            value={currentRating}
                            onClick={(e) => onRating(e, currentRating)}
                        />
                        <FaStar className='star'
                            size={30}
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </div>
    )
}

export default Rating2