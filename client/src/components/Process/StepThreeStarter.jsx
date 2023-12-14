import React from 'react'

const StepThreeStarter = () => {
    return (
        <div className='tablet:px-20 tablet:h-[70vh] phone:px-3 '>
            <div className='h-[100%] overflow-auto no-scrollbar'>
                <div className='
                phone:pt-[100px] laptop:pt-[0px]
                            flex
                            tablet:h-full
                            phone:h-[90%]
                            phone:flex-col-reverse 
                            laptop:flex-row
                            tablet:items-center 
                            tablet:justify-center
                            '>
                    <div className='flex flex-col tablet:basis-1/3 gap-4 text-airbnb-light-black'>
                        <span className='tablet:text-2xl phone:text-[16px]'>Step 3</span>
                        <strong className='tablet:text-4xl phone:text-[32px]'>Finish up and publish</strong>
                        <span className='tablet:text-xl phone:text-[16px]'>
                            Finally, you'll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.
                        </span>
                    </div>
                    <div className=' tablet:basis-1/2'>
                        {/* control = false nghĩa là chỉ định các điều khiển vidéo sẽ ẩn */}
                        <video src='./home3.mp4' autoPlay loop controls={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepThreeStarter