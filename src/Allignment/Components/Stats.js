import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Number } from './Number'
import '../CSS/Stats.css'

export const StatsContainer = React.memo((props) => {
  return (
    <div className='statsContainer'>
      <button className={props.showStats ? 'statsButton onClick' : 'statsButton'} 
        onClick={props.handleClick}/>
      <Stats showStats={props.showStats} 
        score={props.score} 
        alignmentList={props.alignmentList} 
        alignmentNumber={props.alignmentNumber} 
        showSettings={props.showSettings}/>
    </div>
  )
})

const Stats = React.memo((props) => {
  const [memorizedAlignmentList, setMemorizedAlignmentList] = useState([])
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (props.showStats) {
      setMemorizedAlignmentList(props.alignmentList);
    }
  }, [props.showStats, props.alignmentList]);

  const memorizedAlignments = useMemo(() => {
    if (memorizedAlignmentList.length > 1000) {
      return (
        <div key={0} className='alignment'>
          <p>{memorizedAlignmentList[0][0]}</p>
          <p>{memorizedAlignmentList[0][2]}</p>
          <p>{memorizedAlignmentList[0][1]}</p>
      </div>
      )
    }

    return memorizedAlignmentList.map( ([str1, str2, symbol], index) => (
      <div key={index} className='alignment'>
        <p>{str1}</p>
        <p>{symbol}</p>
        <p>{str2}</p>
      </div>
    ))
  }, [memorizedAlignmentList])

  return (
    <div className='statsMask'>
      <div ref={wrapperRef} className='stats' style={{transform:`translateY(${props.showStats ? '0px' : `-100%`})`}} >
        <Number label={'Score'} value={props.score}/>
        <Number label={'possible Alignments'} value={props.alignmentNumber} />
        <div className='statsWrapper' style={{width: (props.showSettings ? 'calc(100% - var(--settingsBar-size))' : '100%')}}>
          {memorizedAlignments}
        </div>
      </div>
    </div>
  );
})