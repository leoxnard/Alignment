import React from 'react'
import './Allignments.css'

export default function Allignments(props) {
  if (!Array.isArray(props.allignmentList)) {
    return;
  }
  if (props.showAllignments) {
    return (
      <div className='allignmentContainer'>
        {props.allignmentList.map( ([str1, str2, symbol], index) => (
          <div key={index} className="allignment">
            <p>{str1}</p>
            <p>{symbol}</p>
            <p>{str2}</p>
          </div>
        ))}
      </div>
    );
  }
  return;
}
