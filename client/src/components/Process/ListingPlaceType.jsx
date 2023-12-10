import React from 'react'
import House from "../../svg/lisitngTypes/house"
import Room from '../../svg/lisitngTypes/room'
import SharedRoom from '../../svg/lisitngTypes/shared-room'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaceType } from '../../store/slices/ProcessSlice'
const ListingPlaceType = () => {
    const placeType = useSelector((state) => state.CreateProcess.placeType)
    const dispatch = useDispatch()
    const data = [
        {
            id: 1,
            title: "An entire place",
            subTitle: "Guests have the whole place to themselves.",
            svg: <House />,
            data: "Entire"
        },
        {
            id: 2,
            title: "A room",
            subTitle: "Guests have their own room in a home, plus access to shared spaces.",
            svg: <Room />,
            data: "Private room"
        },

        {
            id: 3,
            title: "A shared room",
            subTitle: "Guests sleep in a room or common area that may be shared with you or others.",
            svg: <SharedRoom />,
            data: "Room"
        }

    ]
    return (
        <div className='flex flex-col h-[70vh] items-center justify-center'>
            <div className='font-semibold text-4xl'>
                Which of these best describes your place?
            </div>
            <div className='flex flex-col h-[70%] w-[800px] justify-center gap-5'>
                {data.map((type, i) => (
                    <div
                        onClick={() => dispatch(setPlaceType({ id: type.id, type: type.data }))}
                        key={type.title} className={`flex border 
                        border-gray-300 rounded-md p-7
                        hover:border-gray-950
                        justify-between
                        transition-all
                        duration-300
                        ${placeType?.id === type?.id ? 'border-gray-950 bg-slate-100' : ''}
                    `} >
                        <div>
                            <h4 className='font-semibold'>{type?.title}</h4>
                            <p>{type?.subTitle}</p>
                        </div>
                        {type?.svg}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListingPlaceType
