import { IoIosArrowDown } from "react-icons/io";
import { BsFillHouseGearFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
const data = [
    {
        title: "Change listing",
        icon: <IoIosArrowDown />
    },
    {
        title: "Listing details",
        icon: <BsFillHouseGearFill />,
        children: [
            {
                title: "Photos"
            },
            {
                title: "Listing basics"
            },
            {
                title: "Amentities"
            },
            {
                title: "Location"
            },
            {
                title: "Property and rooms"
            }
        ]
    },
    {
        title: "Photos",
        icon: <IoIosArrowBack />,
        children: [
            {
                title: "All photos"
            }
        ],
    }
]

export default data