import React from 'react'
import './InputPersonal.css'
const InputPersonal = ({ type = "text", value = "", setValue, item, setItem, title }) => {
    const hasValue = (value) => value !== "";
    return (
        <div className={`input-personal ${item === title ? "on" : "off"} `} >
            <input
                onClick={() => setItem(title)}
                id={title}
                type={type} value={value === "" ? null : value}
                onChange={(e) => setValue(e.target.value)}
                className={hasValue(value) ? 'filled' : ''}
            />
            <label htmlFor={title} >{title}</label>
        </div>
    )
}

export default InputPersonal