import { Drawer, List, Stack, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel, AccordionItemState } from 'react-accessible-accordion';
import data from '../../utils/SidebarDetails';
import { MdOutlineArrowDropDown } from 'react-icons/md';


// khi data là dữ liệu có chứa thuộc tính chứa react-icon thì tên tệp là đuôi .jsx
const Sidebar = () => {
    return (
        <div >
            <Accordion
                className="accordion"
                allowMultipleExpanded={false}
                preExpanded={[0]}
            >
                {data.map((item, i) => {
                    const [className, setClassName] = useState(null);
                    return (
                        <AccordionItem className={`accordionItem ${className}`} uuid={i} key={i}>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flexCenter accordionButton ">
                                    {/* just for getting state of item */}
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
                            </AccordionItemHeading>
                            {item.children && item.children.map((list, i) => (
                                <AccordionItemPanel key={i}>
                                    <p className="secondaryText">{list.title}</p>
                                </AccordionItemPanel>
                            ))}
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>

    )
}

export default Sidebar