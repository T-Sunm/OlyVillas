import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import RoomDetails from './RoomDetails'

const Room = () => {
    const [toggle, setToggle] = useState(false)
    const { placeSpace } = useSelector(state => state.EditProp)

    const Rooms = [
        {
            title: "Bedrooms",
            key: "bedrooms"
        },
        {
            title: "Bed",
            key: "beds"
        },
        {
            title: "Bathrooms",
            key: "bathrooms"
        },
    ]

    const getQuantityRoom = (key) => {
        const quantity = placeSpace[key].quantity
        return quantity
    }

    return (

        <>
            {!toggle ? (
                <div className='flex justify-between items-start pb-[24px] mb-[24px] border-b-[0.5px]'>
                    <div>
                        <span className='text-[16px] font-light mb-[2px]'>
                            Rooms and spaces
                        </span>
                        <div>
                            {Rooms.map(room => (
                                <div className='text-[14px] text-[#717171]'>
                                    {room.title} :{" "}{getQuantityRoom(room.key)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        onClick={() => setToggle(true)}
                        className='underline font-medium' >
                        Edit
                    </div>
                </div>
            ) : (
                <div>
                    <RoomDetails setToggle={setToggle} />
                </div>
            )}
        </>
    )
}

export default Room