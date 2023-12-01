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
    },
    {
        title: "Amenities",
        icon: <IoIosArrowBack />,
        children: [
            {
                title: "Popular"
            },
            {
                title: "Bathroom"
            },
            {
                title: "Bedroom and laundry"
            },
            {
                title: "Entertainment"
            },
            {
                title: "Heating and cooling"
            },
            {
                title: "Home safety"
            },
            {
                title: "Internet and office"
            },
            {
                title: "Kitchen and dining"
            },
            {
                title: "Location features"
            },
            {
                title: "Outdoor"
            },
            {
                title: "Parking and facilities"
            },
            {
                title: "Services"
            }

        ],
    }
]

export default data