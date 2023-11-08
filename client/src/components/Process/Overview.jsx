import React from 'react'

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
        <div className='h-[90%] px-32'>
            <div className='flex items-center justify-between gap-20'>
                <div>
                    <span className='text-5xl text-airbnb-light-black font-semibold'>
                        {mainTitle}
                    </span>
                </div>
                <div className='flex flex-col gap-16'>
                    {data.map((step, i) => (
                        <div key={i} className='flex items-center justify-start gap-6'>
                            <div className='text-2xl pt-5 '>
                                {i + 1}
                            </div>
                            <div className='flex items-center justify-center gap-6'>
                                <div className='flex flex-col pt-5'>
                                    <span className='text-2xl font-semibold'>
                                        {step.title}
                                    </span>
                                    <span className='text-airbnb-light-gray'>
                                        {step.description}
                                    </span>
                                </div>
                                <div className='w-48 h-32 object-cover'>
                                    <img src={step.image} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Overview