import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import PropertyCardmain from '../../components/PropertyCard/PropertyCardmain'
import useProperties from '../../hooks/useProperties'
import PuffLoader from 'react-spinners/PuffLoader'

const Whistlist = () => {

    const { userInfo } = useSelector((state) => state.auth)

    const { data, isError, isLoading } = useProperties()

    console.log(data)
    if (isError) {
        return (
            <div className='wrapper'>
                <span>
                    Error while fetching data
                </span>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className='wrapper flexCenter'>
                <PuffLoader
                    color='#4066ff'
                    aria-label='puff-loading'
                />
            </div>
        )
    }

    const ResidenciesLike = useMemo(() => {
        const favResidenciesSet = new Set(userInfo.user.favResidenciesID);
        return data.filter(Residency => favResidenciesSet.has(Residency.id));
    }, [data, userInfo])

    return (
        <div className='grid desktop:grid-cols-5 
        laptop:grid-cols-4 
        tablet:grid-cols-3 
        gap-6
        laptop:gap-5
        tablet:gap-4
        phone:gap-3
        px-[65px] mt-[20px]'>
            {
                ResidenciesLike.map((card, i) => (
                    <PropertyCardmain key={i} card={card} number={i} />
                ))
            }
        </div>
    )
}

export default Whistlist