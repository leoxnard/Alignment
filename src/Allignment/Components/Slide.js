import React from 'react'
import '../CSS/Range.css'

export function Slide(props) {
  const handleChange = (e) => {
    document.documentElement.style.setProperty('--matrix-scale', e.target.value)
    props.handleChange(e);
  }
  return (
    <div className='rangeContainer'>
      <label> {props.label} </label>
      <input className='range' type='range' min={props.min} max={props.max} step={props.step} value={props.value} onChange={handleChange}/>
    </div>
  )
}
