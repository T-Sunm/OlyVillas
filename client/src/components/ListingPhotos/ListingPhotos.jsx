import React, { useState } from 'react'
import "./ListingPhotos.css"
const ListingPhotos = ({ photos }) => {
    const [currentPhoto, setCurrentPhoto] = useState(0)
    return (
        <div className='rounded-lg overflow-hidden'>
            {photos.length > 1 && (
                <ul className='ListingPhotos'>
                    {photos.map((photo, index) => (
                        <li
                            key={photo}
                            className='cursor-pointer'
                            onClick={() => setCurrentPhoto(index)}
                        >
                            <img src={photo.url} alt='listing' className='w-full h-full object-fill' />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ListingPhotos