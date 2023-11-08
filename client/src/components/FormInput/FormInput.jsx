import React from 'react'

const FormInput = ({ name, type = "text", value, setValue, placeholder, isListing = false }) => {
  return (
    <input type={type} value={value} placeholder={placeholder}
      onChange={(e) => isListing ?
        setValue(name, e.target.value) :
        setValue(e.target.value)}
      className='border border-gray px-2 py-4 rounded-md w-full'
    />
  )
}

export default FormInput