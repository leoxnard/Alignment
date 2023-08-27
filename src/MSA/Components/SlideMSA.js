import React from 'react'
import '../CSS/RangeMSA.css'

export function SlideMSA(props) {
  const handleChange = (e) => {
    props.handleChange(e);
  }
  return (
    <div className='rangeContainer' style={props.style}>
      <label> {props.label} </label>
      <input className='range' type='range' min={props.min} max={props.max} step={props.step} value={props.value} onChange={handleChange} style={props.style}/>
    </div>
  )
}
