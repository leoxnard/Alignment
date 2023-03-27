import React from 'react'
import '../CSS/Settings.css'
import '../CSS/Select.css'
import '../CSS/Switch.css'

export function SettingsContainer(props) {
  return (
    <div className='settingsContainer'>
      <button className={props.showSettings ? 'settingsButton onClick' : 'settingsButton'} onClick={props.handleClick}/>
      <Settings showSettings={props.showSettings}>
        { props.children }
      </Settings>
    </div>
  )
}

function Settings(props) {
  return (
    <div className='settingsWrapperContainer' style={{ transform: (props.showSettings ? 'translateX(0px)' : 'translateX(-100%)') }} >
      <div className='settingsWrapper' > { props.children }</div>
    </div>
  ); 
}

export function SettingsSlideContainer(props) {
  return (
    <div className='settingsSlideContainerMask'>
      <div className='settingsSlideContainer' style={{ top: (props.show ? '0px' : props.position) }}> { props.children } </div>
    </div>
  );
}