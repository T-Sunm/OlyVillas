import { IoIosArrowDown } from "react-icons/io";
import { BsFillHouseGearFill } from "react-icons/bs";
const data = [
    {
        title:"Change listing",
        icon:<IoIosArrowDown/>
    },{
        title:"Listing details",
        icon:<BsFillHouseGearFill/>,
        children:[
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
    }
]

export default data