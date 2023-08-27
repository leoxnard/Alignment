import React from 'react'
import '../CSS/HeadlineMSA.css'

export function Headline(props) {
  return (
    <header className='headline'> { props.children } </header>
  )
}