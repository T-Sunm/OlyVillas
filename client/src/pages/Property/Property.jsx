import React, { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { createReservation, getProperty, getReservation } from '../../utils/api'
import PuffLoader from 'react-spinners/PuffLoader'
import ListingPhotos from '../../components/ListingPhotos/ListingPhotos'
import ListingAmenties from '../../components/ListingAmenties/ListingAmenties'
import LisingMap from '../../components/ListingMap/LisingMap'
import TripScheduler from '../../components/TripScheduler/TripScheduler'
import { useDispatch, useSelector } from 'react-redux'
import { setEndDate, setPrice, setResidencyId, setStartDate, setTripInfo } from '../../store/slices/Reservation'
import { toast } from 'react-toastify'
import useProperty from '../../hooks/useProperty'
import Rating2 from '../../components/Rating/Rating2'
import Rating from '../../components/Rating/Rating'
import { queryClient } from '../../api/Residency'

const Property = () => {

    const { propertyId } = useParams()

    const dispatch = useDispatch()

    const params = {
        ResidencyId: propertyId
    };

    const { data, isLoading, isError } = useProperty(propertyId)

    const { data: dataReservation, isLoadingReservation, isError: ReservationError } = useQuery(["reservation", propertyId],
        () => getReservation(params),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Do not refetch when the component mounts
        }
    )

    const { tripInfo, price, startDate, endDate } = useSelector((state) => state.reservation)

    const { userInfo } = useSelector((state) => state.auth)


    const { mutate } = useMutation({
        mutationFn: () => createReservation(userInfo.user.id, data.id, tripInfo, price, startDate, endDate),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            queryClient.invalidateQueries(["reservations"])
            toast.success("Added Successfully", { position: "bottom-right" })
            dispatch(setResidencyId(undefined))
            dispatch(setTripInfo({}))
            dispatch(setPrice(0))
            dispatch(setStartDate(undefined))
            dispatch(setEndDate(undefined))
            window.location.reload();
        }

    })

    const starts = useMemo(() => {
        if (data?.Rating?.length === 0) {
            return 0; // Trả về 0 nếu không có đánh giá nào
        }
        const totalStars = data?.Rating?.reduce((acc, obj) => acc + obj.stars, 0);
        return (totalStars / data?.Rating?.length).toFixed(1);
    }, [data])

    console.log(data)

    if (isLoading) {
        return (
            <div className="wrapper">
                <div className='flexCenter paddings'>
                    <PuffLoader />
                </div>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="wrapper">
                <div className='flexCenter paddings'>
                    <span>Error while fetching the property details</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                {data && (
                    <div className='px-20 pt-10 text-airbnb-light-black  gap-10'
                    >
                        <div className='flex flex-col gap-5'>
                            <div className='flex gap-1 '>
                                <h2 className='text-5xl'>{data.title}</h2>

                            </div>
                            <ListingPhotos photos={data.photos} />
                            <div className='flex' >
                                <div className='flex flex-col gap-3 w-[58.333333333333336%] h-auto'>
                                    <div className='flex justify-between'>
                                        <h3 className='text-2xl font-semibold'>
                                            {data?.placeType.type}{""} {data.locationType.name} {" in"} {data?.mapData?.locality + ", " + data?.mapData?.place + ", " + data?.mapData?.region + ", " + data?.mapData?.country}
                                            {/* hosted by{" "}
                                        {data?.owner?.firstName}{" "}
                                        {data?.owner?.lastName}{" "} */}
                                        </h3>
                                        <div className='flex items-center gap-2'>
                                            <Rating stars={starts} />
                                            <span className='text-[20px] font-semibold'>{starts}</span>
                                        </div>

                                    </div>
                                    <ul className='flex gap-5'>
                                        {Object.keys(data.placeSpace).map(TypeSpace => (
                                            <li key={TypeSpace} className='border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start w-32'>
                                                <span clas qdsName='text-2xl font-semibold'>{data.placeSpace[TypeSpace].quantity}</span>
                                                <span className='capitalize'>{data.placeSpace[TypeSpace].status} {TypeSpace}</span>
                                            </li>
                                        ))}
                                    </ul>


                                    <p>{data.description}</p>
                                    <ListingAmenties amenties={data.placeAmeneties} />
                                    <div className='mb-[100px]'>
                                        <LisingMap mapLocation={data?.locationData} mapData={data?.mapData} />
                                    </div>
                                </div>
                                <div className='w-[33.33333333333333%] ml-[8.33333333333333%]' style={{ position: "-webkit-sticky" }}>
                                    <TripScheduler price={data.price} mutate={mutate} dataReservation={dataReservation} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Property