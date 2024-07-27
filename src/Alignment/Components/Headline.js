import React from 'react'
import '../CSS/Headline.css'

export function Headline(props) {
  return (
    <header className='headline'> { props.children } </header>
  )
}