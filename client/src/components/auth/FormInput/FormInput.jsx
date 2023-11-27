import React from 'react'
import './FormInput.css'
const FormInput = ({ name, placeholder, value, setValue }) => {

  return (
    <div className={`input-box`} >
      <input name={name} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default FormInput