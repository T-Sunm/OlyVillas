import React from 'react'
import './FormInput.css'
const FormInput = ({ name, type = "text", value, setValue, isListing = false, item, setItem }) => {
  return (
    <div className={` input-box ${item === name ? "on" : "off"} `} onClick={() => setItem(name)}>
      <input
        id={name}
        type={type} value={value}
        onChange={(e) => isListing ?
          setValue(name, e.target.value) :
          setValue(e.target.value)}
      />
      <label htmlFor={name} >{name}</label>
    </div>
  )
}

export default FormInput