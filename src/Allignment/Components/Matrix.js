import React, { Component } from 'react'
import {getLevel} from '../HelpFunctions/helpers'

function Square(props) {
    return(
        <>
            <button className={props.buttonClassName}>
                {props.value}
                <div className={props.arrowClassName} />
            </button>
        </>
    )
}
  
export default class Matrix extends Component {
    getScoreLevel(i) {
        const range = this.props.scoreMatrix[this.props.maxScores[0]] - this.props.scoreMatrix[this.props.minScore];
        const value = this.props.scoreMatrix[i] - this.props.scoreMatrix[this.props.minScore];
        return getLevel(value, range);
    }

    renderSquare (i){
        let buttonClassName = 'square';
        let traceType = 'arrow';
        if (this.props.minimalistic) {
            traceType = 'line';
        }
        if (i < this.props.tracebackMatrix.length) {
            traceType += this.props.tracebackMatrix[i].toString();
        }
        
        if (this.props.minimalistic) {
            buttonClassName += ' mini';
        } else {
            if (i <= this.props.seq1.length + 1){
                buttonClassName += ' first-row';
            }
            if (i % (this.props.seq1.length + 2)  === 0){
                buttonClassName += ' first-col';
            }
        }
        if (i === 1 || i === this.props.seq1.length + 2) {
            return (<Square value={'-'} buttonClassName={buttonClassName} key={i} />)
        }
        if (i < this.props.seq1.length + 2) {
            return (<Square value={this.props.seq1[i-2]} buttonClassName={buttonClassName} key={i} />)
        }
        if (i % (this.props.seq1.length + 2) === 0) {
            return (<Square value={this.props.seq2[i/(this.props.seq1.length + 2) - 2]} buttonClassName={buttonClassName} key={i} />)
        }
        buttonClassName += this.getScoreLevel(i);
        return (<Square value={this.props.scoreMatrix[i]} buttonClassName={buttonClassName} arrowClassName={traceType} key={i} />)
    }

    render () {
        const rows = [];
        for (let i=0; i <= this.props.seq2.length + 1; i++){
            const squares = [];
            for (let j = 0; j <= this.props.seq1.length + 1; j++) {
                squares.push(this.renderSquare(i*(this.props.seq1.length + 2) + j));
            }
            rows.push(<div className='row' key={i}>{squares}</div>);
        }

        return (
        <div className='matrix'>
            { rows }
        </div>
        )
    }
}