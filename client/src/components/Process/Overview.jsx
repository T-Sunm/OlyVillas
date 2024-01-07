import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Overview = () => {

    const mainTitle = "It's ease to get started on Airbnb"
    const data = [{
        title: "Tell us about your place",
        description: "Share some basic info, such as where it is and how many guests can stay.",
        image: "/overview1.webp",
    },
    {
        title: "Make it stand out",
        description: "Add 5 or more photos plus a title and description well help you out.",
        image: "/overview2.webp",
    },
    {
        title: "Finish up and publish",
        description: "Choose if you'd like to start with an experienced guest, set a starting price and publish your listing.",
        image: " /overview3.webp",
    }
    ]

    return (
        <div className='desktop:h-[90%] px-32 phone:px-3'>
            <div className='flex desktop:flex-row laptop:flex-row tablet:flex-row phone:flex-col items-center justify-between gap-20 phone:gap-5'>
                <motion.div
                    initial={{
                        opacity: 0,
                        x: 100
                    }}
                    animate={{
                        opacity: 1,
                        x: 0
                    }}
                    exit={{
                        opacity: 0,
                        x: 100
                    }}
                    transition={{
                        duration: 1,
                        ease: 'backInOut'
                    }}
                >
                    <span className='tablet:text-5xl text-airbnb-light-black font-semibold phone:font-medium phone:text-[36px]'>
                        {mainTitle}
                    </span>
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -100
                    }}
                    animate={{
                        opacity: 1,
                        x: 0
                    }}
                    exit={{
                        opacity: 0,
                        x: -100
                    }}
                    transition={{
                        duration: 1,
                        ease: 'backInOut'
                    }}
                    className='flex flex-col gap-16 '>
                    {data.map((step, i) => (
                        <div key={i} className='flex items-center justify-start gap-6 phone:items-start'>
                            <div className='desktop:text-2xl laptop:text-2xl tablet:text-2xl
                            pt-5 
                            phone:text-[18px]'>
                                {i + 1}
                            </div>
                            <div className='flex items-center justify-center gap-6 phone:justify-start phone:items-start'>
                                <div className='flex flex-col pt-5'>
                                    <span className='tablet:text-2xl tablet:font-semibold phone:text-[18px] phone:font-medium'>
                                        {step.title}
                                    </span>
                                    <span className='text-airbnb-light-gray phone:text-[14px] tablet:text-[16px]'>
                                        {step.description}
                                    </span>
                                </div>
                                <div className='w-48 h-32 object-cover'>
                                    <img src={step.image} />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

    )
}

export default Overview