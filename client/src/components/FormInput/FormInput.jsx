import React from 'react'
import './FormInput.css'
const FormInput = ({ name, type = "text", value, setValue, isListing = false, item, setItem, title }) => {
  const hasValue = (value) => value !== "";
  return (
    <div className={` input-box ${item === name ? "on" : "off"} `} onClick={() => setItem(name)}>
      <input
        id={name}
        type={type} value={value === "" ? null : value}
        onChange={(e) => isListing ?
          setValue(name, e.target.value) :
          setValue(e.target.value)}
        className={hasValue(value) ? 'filled' : ''}
      />

      <label htmlFor={name} >{title}</label>
    </div>
  )
}

export default FormInput