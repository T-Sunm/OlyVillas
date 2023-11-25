import React from 'react'

const StepOneStarter = () => {
    return (
        <div className='px-32 h-[70vh]'>
            <div className='grid desktop:grid-cols-2 items-center tablet:grid-cols-1'>
                <div className='flex flex-col gap-4 text-airbnb-light-black'>
                    <span className='text-2xl'>Step 1</span>
                    <strong className='text-4xl'>Tel us about your place</strong>
                    <span className='text-xl'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how
                        many guests can stay.
                    </span>
                </div>
                <div>
                    {/* control = false nghĩa là chỉ định các điều khiển vidéo sẽ ẩn */}
                    <video src='./home.mp4' autoPlay loop controls={false} />
                </div>
            </div>
        </div>
    )
}

export default StepOneStarter