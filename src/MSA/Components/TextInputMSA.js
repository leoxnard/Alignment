import React from 'react'
import '../CSS/TextInputMSA.css'

export function TextInput(props) {
  return (
    <div className='headlineFragment'>
      <label className='headlineLabel'> {props.label} </label>
      <div className='textInputContainer'>
        <input className='textInput' type='text' maxLength='500' spellCheck="false" value={props.seq} onChange={props.handleChange} />
        <div className='counter'> { props.seq.length } </div>
      </div>
    </div>
  )
}