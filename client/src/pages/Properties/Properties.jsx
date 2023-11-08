import React from 'react'
import NavigationProp from '../../components/Header/NavigationProp'
import FilterTypes from '../../components/Header/FilterTypes'
import PropertyCardmain from '../../components/PropertyCard/PropertyCardmain'
import AuthModal from '../../components/auth/AuthModal'
import { useSelector } from 'react-redux'
import useProperties from '../../hooks/useProperties'
import PuffLoader from 'react-spinners/PuffLoader'

const Properties = () => {
  const isAuth = useSelector((state) => state.auth.value)
  const { data, isError, isLoading } = useProperties()
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
  console.log(data)
  return (
    <div>
      <NavigationProp />
      <div className='flex flex-col justify-center'>
        <FilterTypes />

        <div className='grid desktop:grid-cols-5 
        laptop:grid-cols-4 
        tablet:grid-cols-3 
        desktop:gap-6 
        laptop:gap-5
        tablet:gap-4
        phone:gap-3
        px-[65px] mt-[20px]'>
          {
            data.map((card, i) => (
              <PropertyCardmain key={i} card={card} number={i} />
            ))
          }
        </div>
      </div>
      {isAuth && (
        <AuthModal />
      )}

    </div>
  )
}

export default Properties