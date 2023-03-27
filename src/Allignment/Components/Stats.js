import React, { useState, Fragment, useRef, useMemo, useEffect } from 'react'
import { Number } from './Number'
import '../CSS/Stats.css'

export function Stats(props) {
  return (
    <Fragment>
      <button className={props.showStats ? 'statsButton onClick' : 'statsButton'} onClick={props.handleClick}/>
      <StatsContainer showStats={props.showStats} score={props.score} allignmentList={props.allignmentList}/>
    </Fragment>
  )
}

function StatsContainer(props) {
  const [allignmentList, setAllignmentList] = useState([])
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (props.showStats) {
      setAllignmentList(props.allignmentList);
    }
  }, [props.showStats, props.allignmentList]);

  const memorizedAllignments = useMemo(() => {
    if (allignmentList.length > 1000) {
      return (
        <div key={0} className='allignment'>
          <p>{allignmentList[0][0]}</p>
          <p>{allignmentList[0][2]}</p>
          <p>{allignmentList[0][1]}</p>
      </div>
      )
    }
    return allignmentList.map( ([str1, str2, symbol], index) => (
      <div key={index} className='allignment'>
        <p>{str1}</p>
        <p>{symbol}</p>
        <p>{str2}</p>
      </div>
    ))
  }, [allignmentList])

  return (
    <div className='statsMask'>
      <div ref={wrapperRef} className='statsContainer' style={{transform:`translateY(${props.showStats ? '0px' : `-100%`})`}} >
        <Number label={'Score'} value={props.score}/>
        <Number label={'displayed Allignments'} value={props.allignmentList.length} />
        <div className='statsWrapper'>
          {memorizedAllignments}
        </div>
      </div>
    </div>
  );
}