import { Drawer, List, Stack, Toolbar } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel, AccordionItemState } from 'react-accessible-accordion';
import data from '../../utils/SidebarDetails';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';


// khi data là dữ liệu có chứa thuộc tính chứa react-icon thì tên tệp là đuôi .jsx
const Sidebar = () => {

    const location = useLocation()
    const { propertyId } = useParams()
    console.log(location)
    const [className, setClassName] = useState(null);
    let currentData = useMemo(() => {
        let CurrentData = []
        if (location.pathname === `/editresidency/${propertyId}/photos`) {
            const currentData = data.find(item => item.title === "Photos")
            currentData.linkBack = `/editresidency/${propertyId}/`
            CurrentData.push(data.find(item => item.title === "Photos"))

        }
        else if (location.pathname === `/editresidency/${propertyId}/amenities`) {
            const currentData = data.find(item => item.title === "Amenities")
            currentData.linkBack = `/editresidency/${propertyId}/`
            CurrentData.push(data.find(item => item.title === "Amenities"))
        }
        else {
            CurrentData.push(data.find(item => item.title === "Change listing"))
            CurrentData.push(data.find(item => item.title === "Listing details"))
        }
        return CurrentData
    }, [location, propertyId])

    return (
        <div >
            <Accordion
                className="accordion"
                allowMultipleExpanded={false}
                preExpanded={[0]}
            >
                {currentData.map((item, i) => {

                    return (
                        <AccordionItem className={`accordionItem ${className}`} uuid={i} key={i}>
                            <AccordionItemHeading>
                                {item.title === "Photos" || item.title === "Amenities" ? (
                                    <AccordionItemButton className="flex bg-white w-full justify-start cursor-pointer items-center p-1 ">
                                        {/* just for getting state of item */}

                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded
                                                    ? setClassName("expanded")
                                                    : setClassName("collapsed")
                                            }
                                        </AccordionItemState>
                                        <Link to={item?.linkBack} >
                                            <div className="flexCenter icon">{item?.icon}</div>
                                        </Link>
                                        <span
                                            className="text-[1.1rem] ml-2 text-[#1f3e72] font-bold"
                                        >
                                            {item.title}
                                        </span>

                                    </AccordionItemButton>
                                ) : (
                                    <AccordionItemButton className="flexCenter accordionButton ">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded
                                                    ? setClassName("expanded")
                                                    : setClassName("collapsed")
                                            }
                                        </AccordionItemState>

                                        <span
                                            className="primaryText"
                                        >
                                            {item.title}
                                        </span>
                                        <div className="flexCenter icon">{item?.icon}</div>
                                    </AccordionItemButton>
                                )}
                            </AccordionItemHeading>
                            {
                                item.children && item.children.map((list, i) => (
                                    <AccordionItemPanel key={i}>
                                        <p className="secondaryText">{list.title}</p>
                                    </AccordionItemPanel>
                                ))
                            }
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div >

    )
}

export default Sidebar