import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrice } from '../../store/slices/ProcessSlice'

const Price = () => {
    const price = useSelector((state) => state.CreateProcess.price)
    const dispatch = useDispatch()

    const handleIncre = () => {
        if (price < 999990) {
            dispatch(setPrice(price + 10))
        } else {
            return
        }
    }

    const handleEncre = () => {
        if (price > 10) {
            dispatch(setPrice(price - 10))
        } else {
            return
        }
    }

    return (
        <div className='flex flex-col h-[70vh] gap-5 items-center justify-center'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-semibold text-4xl'>
                    Now, set the price you want
                </h2>
                <p>
                    You can change this price at any time.
                </p>
            </div>
            <div className='flex justify-center items-center gap-7'>
                <button
                    onClick={() => handleEncre()}
                    className='border border-gray-950 py-[10px] px-5 rounded-full hover:border-gray-500'>
                    -
                </button>
                <div className='flex justify-center items-center gap-4'>
                    <textarea
                        className='border border-gray-400 h-[90px] w-[250px] rounded-lg active:border-gray-950 p-6 no-scrollbar text-4xl'
                        value={price}
                        onInput={(e) => {
                            const value = e.target.value;
                            // Kiểm tra xem giá trị hiện tại có phải là số không
                            // Nếu không phải là số, thì thay thế bằng chuỗi rỗng
                            e.target.value = value.replace(/[^0-9]+/g,);
                        }}

                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            console.log(typeof value)
                            if (value >= 10 && value <= 1000000) {
                                dispatch(setPrice(value))
                            } else {
                                dispatch(setPrice(10))
                            }
                        }
                        }
                    />
                    <span className='text-[80px]'>$</span>
                </div>
                <button
                    onClick={() => handleIncre()}
                    className='border border-gray-950 py-[10px] px-5 rounded-full hover:border-gray-500'>
                    +
                </button>
            </div>
        </div>
    )
}

export default Price