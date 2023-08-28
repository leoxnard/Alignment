import React from 'react'
import { randomSequenceMSA } from '../HelpFunctions/helpers';
import { SlideMSA } from './SlideMSA';

import '../CSS/RandomButtonsMSA.css'

export function RandomButtons(props) {
  const handleClick = (mode) => {
    const { seq1_, seq2_, seq3_ } = randomSequenceMSA(mode, props.randomSize);
    props.setSeq1(seq1_);
    props.setSeq2(seq2_);
    props.setSeq3(seq3_);
  }

  return (
    <div className='randomButtonsContainerWithSize'>
      <div className='randomButtonsContainer'>
        <button className='randomButton' onClick={() => handleClick(true)}> { 'random DNA' } </button>
        <button className='randomButton' onClick={() => handleClick(false)}> { 'random AA' } </button>
      </div>
      <div className='randomSlideContainer'>
        <SlideMSA value={props.randomSize} handleChange={props.handleChange} min={20} max={300} step={1} label={'Size:'} style={{width: 'calc(var(--settingsBar-size) - 90px)', margin: '0 0 0px 10px'}} />
        <label className='buttonCounter'> { props.randomSize } </label>
      </div>
    </div>
  )
}
