import React from 'react'

const StepThreeStarter = () => {
    return (
        <div className='px-32 h-[70vh]'>
            <div className='grid desktop:grid-cols-2 items-center tablet:grid-cols-1'>
                <div className='flex flex-col gap-4 text-airbnb-light-black'>
                    <span className='text-2xl'>Step 3</span>
                    <strong className='text-4xl'>Finish up and publish</strong>
                    <span className='text-xl'>Finally, you'll choose if you'd like to start with an experienced guest,
                        then you'll set your nightly price. Answer a few quick questions and publish when you're ready.
                    </span>
                </div>
                <div>
                    {/* control = false nghĩa là chỉ định các điều khiển vidéo sẽ ẩn */}
                    <video src='./home3.mp4' autoPlay loop controls={false} />
                </div>
            </div>
        </div>
    )
}

export default StepThreeStarter