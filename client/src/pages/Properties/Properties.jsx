import React, { useEffect, useState } from 'react'
import NavigationProp from '../../components/Header/NavigationProp'
import FilterTypes from '../../components/Header/FilterTypes'
import PropertyCardmain from '../../components/PropertyCard/PropertyCardmain'
import AuthModal from '../../components/auth/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import useProperties from '../../hooks/useProperties'
import PuffLoader from 'react-spinners/PuffLoader'
import { setData } from '../../store/slices/PropertiesSlice'

const Properties = () => {
  const dispatch = useDispatch()
  const toggleAuthenticated = useSelector((state) => state.auth.toggleAuthenticated)
  const { data, isError, isLoading } = useProperties()

  const dataResidency = useSelector((state) => state.properties.data)

  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    dispatch(setData(data))
  }, [data])

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

  return (
    <div>
      <div className='flex flex-col '>
        <FilterTypes />

        <div className='grid desktop:grid-cols-5 
        laptop:grid-cols-4 
        tablet:grid-cols-2 
        phone:grid-cols-1
        laptop:gap-5                  
        tablet:gap-4
        phone:gap-3
        px-[45px] mt-[20px]'>
          {
            dataResidency && dataResidency.map((card, i) => (
              <PropertyCardmain key={i} card={card} number={i} />
            ))
          }
        </div>
      </div>
      {toggleAuthenticated && (
        <AuthModal toggle={toggle} setToggle={setToggle} />
      )}
    </div>
  )
}

export default Properties