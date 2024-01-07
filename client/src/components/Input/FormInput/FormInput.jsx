import React, { useEffect } from 'react'
import './FormInput.css'
const FormInput = ({ name, type = "text", value, setValue, item, setItem, title, notCheckValid }) => {
  const hasValue = (value) => value !== "" && value !== null;

  return (
    <div className={` input-box ${item === name ? "on" : "off"} ${hasValue(value) || notCheckValid ? "" : "notValue"} `} onClick={() => setItem(name)}>
      <input
        id={name}
        type={type} value={value}
        onChange={(e) => setValue(name, e.target.value)}
        className={hasValue(value) ? 'filled' : ''}
      />
      <label htmlFor={name} >{title}</label>
    </div>
  )
}

export default FormInput