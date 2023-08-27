import React from 'react'
import '../CSS/ButtonMSA.css'

export function Button(props) {
  return (
    <button className={props.disabled ? 'button disabled' : 'button'} onClick={props.disabled ? undefined : props.handleClick} style={props.style}> {props.label} </button>
  )
}
