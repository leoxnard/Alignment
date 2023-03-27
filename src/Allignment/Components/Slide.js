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
      <input type='range' min='0.3' max='1' step='0.01' className='range' value={props.value} onChange={handleChange}/>
    </div>
  )
}
