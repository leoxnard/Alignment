import React, { useState, useRef, useLayoutEffect } from 'react'

export function Switch(props) {  
  const obj1Ref = useRef(null);
  const obj2Ref = useRef(null);

  const [statsWidthObj1, setStatsWidthObj1] = useState(0)
  const [statsWidthObj2, setStatsWidthObj2] = useState(0)

  useLayoutEffect(() => {
    if (obj1Ref.current) {
      setStatsWidthObj1(obj1Ref.current.offsetWidth);
    }
    if (obj2Ref.current) {
      setStatsWidthObj2(obj2Ref.current.offsetWidth);
    }
  },[props.value]);

  const style = props.value ? {width: statsWidthObj2 + 10, left: statsWidthObj1 + 15} : {width: statsWidthObj1 + 10, left: 5};

  return (
    <button className='switchContainer' onClick={props.handleClick}>
      <Object label={props.label1} innerRef={obj1Ref}/>
      <Object label={props.label2} innerRef={obj2Ref}/>
      <MutableObject style={style}/>
    </button>
  );
}


function Object(props) {
  return (
    <div className='object' ref={props.innerRef}> {props.label} </div>
  )
}

function MutableObject(props) {
  return (
    <div className='mutableObject' style={props.style}/>
  )
}