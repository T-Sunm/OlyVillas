import React from 'react'

const StepOneStarter = () => {
    return (
        <div className='tablet:px-20 tablet:h-[70vh] phone:px-3 '>
            <div className='h-[100%] overflow-auto no-scrollbar'>
                <div className='
                phone:pt-[100px] laptop:pt-[0px]
                            flex
                            tablet:h-full
                            phone:h-[90%]
                            phone:flex-col-reverse 
                            tablet:flex-col-reverse
                            laptop:flex-row
                            tablet:items-center 
                            tablet:justify-center
                            '>
                    <div className='flex flex-col tablet:basis-1/3 gap-4 text-airbnb-light-black'>
                        <span className='tablet:text-2xl phone:text-[16px]'>Step 1</span>
                        <strong className='tablet:text-4xl phone:text-[32px]'>Tel us about your place</strong>
                        <span className='tablet:text-xl phone:text-[16px]'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how
                            many guests can stay.
                        </span>
                    </div>
                    <div className=' tablet:basis-1/2'>
                        {/* control = false nghĩa là chỉ định các điều khiển vidéo sẽ ẩn */}
                        <video src='./home.mp4' autoPlay loop controls={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOneStarter