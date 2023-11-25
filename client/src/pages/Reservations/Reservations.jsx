import React, { useMemo } from 'react'
import { deleteReservation, getReservation } from '../../utils/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate, useNavigation, useRoutes } from 'react-router-dom'
import { toast } from 'react-toastify'
import PropertyCardmain from '../../components/PropertyCard/PropertyCardmain'
import Navigation from '../../components/Header/Navigation'

const Reservations = () => {

    const { user } = useSelector((state) => state.auth.userInfo)
    const queryClient = useQueryClient();

    const params = {
        userId: user.id
    };

    const { data: dataReservation, isLoadingReservation, isError: ReservationError } = useQuery(["reservations", user.id], () => getReservation(params))
    const { mutate: mutateCancelReservation } = useMutation({
        mutationFn: (id) => deleteReservation(id),
        onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
        onSuccess: () => {
            toast.success('Reservation cancelled')
            queryClient.invalidateQueries(["reservations", user.id])

        }
    })

    const FilteReservation = useMemo(() => {
        if (dataReservation) {
            let reservations = dataReservation.filter((reservation) => {
                return reservation.Status !== "Cancel Reservations"
            })
            return reservations
        } else {
            return []
        }
    }, [dataReservation])
    return (
        <>
            <div className='flex flex-col px-20 pt-10'>
                <div className='flex flex-col gap-1'>
                    <span className='text-2xl font-semibold'>
                        Trips
                    </span>
                    <span className='text-airbnb-light-gray'>
                        Where you've been and where you're going
                    </span>
                </div>
                {FilteReservation && (
                    <div className='grid desktop:grid-cols-4     
                laptop:grid-cols-3 
                tablet:grid-cols-2 
                gap-6
                laptop:gap-5
                tablet:gap-4
                phone:gap-3
                mt-[20px]'>
                        {
                            FilteReservation.map((card, i) => (
                                <PropertyCardmain
                                    key={i}
                                    card={card.Residency}
                                    number={i}
                                    reservation={card}
                                    onAction={mutateCancelReservation}
                                />
                            ))
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Reservations