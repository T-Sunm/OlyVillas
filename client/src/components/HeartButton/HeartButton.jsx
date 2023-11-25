import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from '../../hooks/useFavourite';
const HeartButton = ({ ResidencyId, currentUser }) => {

    if (!ResidencyId || !currentUser) {
        return <div
            className="
                absolute
                hover:opacity-80
                transition
                cursor-pointer
                right-2
                top-2
                z-10
                "
        >
            <AiOutlineHeart
                size={28}
                className="
                 fill-white
                 absolute
                 -top-[2px]
                 -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={
                    'fill-neutral-500/70'
                }
            />
        </div>
    }

    const { hasFavorited, toggleFavourite } = useFavourite(ResidencyId, currentUser)

    return (
        <div
            onClick={(e) => toggleFavourite(e, ResidencyId)}
            className="
                absolute
                hover:opacity-80
                transition
                cursor-pointer
                right-2
                top-2
                z-10
                "
        >
            <AiOutlineHeart
                size={28}
                className="
                 fill-white
                 absolute
                 -top-[2px]
                 -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={
                    hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
                }
            />
        </div>
    )
}

export default HeartButton