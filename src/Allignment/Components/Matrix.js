import React, { useMemo } from 'react'
import {getScoreLevel} from '../HelpFunctions/helpers'
import '../CSS/Matrix.css'

function Square(props) {
  return(
    <div className={props.buttonClassName}>
        {props.value}
      <div className={props.arrowClassName} />
    </div>
  )
}

function Matrix(props) {
  const { seq1, seq2, scoreMatrix, tracebackMatrix, minScore, maxScores, minimalistic } = props;
  const squares = useMemo(() => {
    let squares = [];
    for (let i=0; i <= scoreMatrix.length - 1; i++){
      let buttonClassName = 'square';
      let traceType = 'arrow';
      if (minimalistic) {
        traceType = 'line';
      }
        traceType += tracebackMatrix[i].toString();

      if (minimalistic) {
          if (i <= seq1.length + 1 || i % (seq1.length + 2)  === 0) {
            continue;
          }
          if (i === 1 || i === seq1.length + 2) {
            squares.push(<Square buttonClassName={buttonClassName} key={i} />);
            continue;
          }
          if (i < seq1.length + 2) {
            squares.push(<Square buttonClassName={buttonClassName} key={i} />)
            continue;
          }
          if (i % (seq1.length + 2) === 0) {
            squares.push(<Square buttonClassName={buttonClassName} key={i} />)
            continue;
          }
          buttonClassName += getScoreLevel(i, scoreMatrix, minScore, maxScores);
          squares.push(<Square buttonClassName={buttonClassName} arrowClassName={traceType} key={i} />)
          continue;
        }
        if (i <= seq1.length + 1){
          buttonClassName += ' first-row';
        }
        if (i % (seq1.length + 2)  === 0){
          buttonClassName += ' first-col';
        }
      if (i === 1 || i === seq1.length + 2) {
          squares.push(<Square value={'-'} buttonClassName={buttonClassName} key={i} />);
          continue;
      }
      if (i < seq1.length + 2) {
          squares.push(<Square value={seq1[i-2]} buttonClassName={buttonClassName} key={i} />)
          continue;
      }
      if (i % (seq1.length + 2) === 0) {
          squares.push(<Square value={seq2[i/(seq1.length + 2) - 2]} buttonClassName={buttonClassName} key={i} />)
          continue;
      }
      buttonClassName += getScoreLevel(i, scoreMatrix, minScore, maxScores);
      squares.push(<Square value={scoreMatrix[i]} buttonClassName={buttonClassName} arrowClassName={traceType} key={i} />)
    }

    return squares;
  }, [seq1, seq2, scoreMatrix, tracebackMatrix, minScore, maxScores, minimalistic]);

  return (
    <div className='matrixContainer' >
      <div className='matrixMask' style={{height: `${props.matrixHeight}px`, width: `${props.matrixWidth}px`}}>
        <div className='matrix'>
          { squares }
        </div>
      </div>
    </div>
  )
}

export default React.memo(Matrix);