import React from 'react'
import { randomSequence } from '../HelpFunctions/helpers';
import '../CSS/RandomButtons.css'

export function RandomButtons(props) {
  const handleClick = (dna, square) => {
    const { seq1_, seq2_, showAllAllignments_ } = randomSequence(dna, square, props.minimalistic, props.scale);
    props.setSeq1(seq1_);
    props.setSeq2(seq2_);
    if (props.showAllAllignments && !showAllAllignments_) {props.setShowAllAllignments(showAllAllignments_);}
  }

  return (
    <div className='randomButtonsContainer'>
      <button className='randomButton' onClick={() => handleClick(true, false)}> { 'random DNA' } </button>
      <button className='randomButton' onClick={() => handleClick(true, true)}> { 'random DNA²' } </button>
      <button className='randomButton' onClick={() => handleClick(false, false)}> { 'random AA' } </button>
      <button className='randomButton' onClick={() => handleClick(false, true)}> { 'random AA²' } </button>
    </div>
  )
}
