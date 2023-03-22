import React, { Component, Fragment } from 'react'
import './CSS/Headline.css';
import './CSS/Matrix.css';
import {computeScores} from './Algorithmms/Algorithms'
import {randomAASequence, randomDNASequence} from './HelpFunctions/helpers'
import Matrix from './Components/Matrix';
import Allignments from './Components/Allignments';

export class Allignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seq1: 'TTT',
      seq2: 'T',
      scoreMatrix: [0,0,0,0],
      tracebackMatrix: [0,0,0,0],
      allignmentList: [],
      gapScore: '-2',
      extensionScore: '-1',
      mismatchScore: '-1',
      matchScore: '1',
      maxScores: 4,
      minScore: 4,
      score: 0,
      minimalistic: false,
      algorithm: 0,
      realTime: true,
      scale: 1,
      showAllignments: false,
      showAllAllignments: false,
    };
  }

  computeAllignment() {
    if (!(isNaN(parseInt(this.state.matchScore)) || isNaN(parseInt(this.state.mismatchScore)) || isNaN(parseInt(this.state.gapScore)))){
      const [scoreMatrix, minScore, maxScores, tracebackMatrix, allignmentList, score] = computeScores(this.state.seq1, this.state.seq2, parseInt(this.state.matchScore), parseInt(this.state.mismatchScore), parseInt(this.state.gapScore), parseInt(this.state.extensionScore), this.state.algorithm, this.state.showAllAllignments);
      this.setState({scoreMatrix: scoreMatrix, tracebackMatrix: tracebackMatrix, minScore: minScore, maxScores: maxScores, allignmentList: allignmentList, score: score});
    }
  }

  handleChangeSeq1(e) {
    if (!this.state.realTime) {
      this.setState({ seq1: e.target.value.toUpperCase() });
      return;
    }
    if (e.target.value.length + this.state.seq2.length > 100) {
      this.setState({ seq1:  e.target.value.toUpperCase(), showAllAllignments: false}, () => {this.computeAllignment();})
      return;
    }
    this.setState({ seq1:  e.target.value.toUpperCase()}, () => {this.computeAllignment();})
  }

  handleChangeSeq2(e) {
    if (!this.state.realTime) {
      this.setState({ seq2: e.target.value.toUpperCase() });
      return;
    }
    if (e.target.value.length + this.state.seq1.length > 100) {
      this.setState({ seq2:  e.target.value.toUpperCase(), showAllAllignments: false}, () => {this.computeAllignment();})
      return;
    }
    this.setState({ seq2:  e.target.value.toUpperCase()}, () => {this.computeAllignment();})
  }

  handleChangeMatch(e) {
    if (!this.state.realTime) {
      this.setState({ matchScore: e.target.value });
      return;
    }
    this.setState({ matchScore: e.target.value }, () => {this.computeAllignment();})
  }

  handleChangeMismatch(e) {
    if (!this.state.realTime) {
      this.setState({ mismatchScore: e.target.value });
      return;
    }
    this.setState({ mismatchScore: e.target.value }, () => {this.computeAllignment();})
  }

  handleChangeGap(e) {
    if (!this.state.realTime) {
      this.setState({ gapScore: e.target.value });
      return;
    }
    this.setState({ gapScore: e.target.value }, () => {this.computeAllignment();})
  }

  handleMiniClick() {
    if (this.state.minimalistic){
      this.setState({minimalistic: false});
      return;
    }
    this.setState({minimalistic: true});
  }

  handleRealTimeClick() {
    if (this.state.realTime){
      this.setState({realTime: false});
      return;
    }
    this.setState({realTime: true}, () => {this.computeAllignment();})
  }

  handleRenderClick() {
    if (!this.state.realTime) {
      this.computeAllignment();
    }
  }

  handleSelectAlgorithmChange(e) {
    if (this.state.realTime){
      this.setState({algorithm: parseInt(e.target.value)}, () => {this.computeAllignment();});
      return;
    }
    this.setState({algorithm: parseInt(e.target.value)});
  }

  handleRandomAAClick() {
    if (this.state.minimalistic){
      const seq1 = randomAASequence(Math.floor(window.innerWidth) / (this.state.scale * 10) - (6 / this.state.scale));
      const seq2 = randomAASequence(Math.floor(window.innerHeight * 1) / (this.state.scale * 11) - (4 / this.state.scale));
      if (seq1.length + seq2.length > 100) {
        this.setState({ seq1: seq1, seq2: seq2, showAllAllignments: false }, () => {this.computeAllignment();})
        return;
      }
      this.setState({ seq1: seq1, seq2: seq2 }, () => {this.computeAllignment();})
      return;
    }
    const seq1 = randomAASequence(Math.floor(window.innerWidth) / (this.state.scale * 51) - 3);
    const seq2 = randomAASequence(Math.floor(window.innerHeight / (this.state.scale * 50) - ((5*3) / (this.state.scale * 4))));
    if (seq1.length + seq2.length > 100) {
      this.setState({ seq1: seq1, seq2: seq2, showAllAllignments: false }, () => {this.computeAllignment();})
      return;
    }
    this.setState({ seq1: seq1, seq2: seq2 }, () => {this.computeAllignment();})
  }

  handleRandomDNAClick() {
    if (this.state.minimalistic){
      const seq1 = randomDNASequence(Math.floor(window.innerWidth) / (this.state.scale * 10) - (6 / this.state.scale));
      const seq2 = randomDNASequence(Math.floor(window.innerHeight * 1) / (this.state.scale * 11) - (4 / this.state.scale));
      if (seq1.length + seq2.length > 100) {
        this.setState({ seq1: seq1, seq2: seq2, showAllAllignments: false }, () => {this.computeAllignment();})
        return;
      }
      this.setState({ seq1: seq1, seq2: seq2 }, () => {this.computeAllignment();})
      return;
    }
    const seq1 = randomDNASequence(Math.floor(window.innerWidth) / (this.state.scale * 51) - 3);
    const seq2 = randomDNASequence(Math.floor(window.innerHeight / (this.state.scale * 50) - ((5*3) / (this.state.scale * 4))));
    if (seq1.length + seq2.length > 100) {
      this.setState({ seq1: seq1, seq2: seq2, showAllAllignments: false }, () => {this.computeAllignment();})
      return;
    }
    this.setState({ seq1: seq1, seq2: seq2 }, () => {this.computeAllignment();})
  }

  handleScaleSlide(e) {
    this.setState({ scale: e.target.value }, () => {document.documentElement.style.setProperty('--matrix-scale', e.target.value);})
  }

  handleShowAllignments() {
    if (this.state.showAllignments) {
      this.setState({ showAllignments: false });
      return;
    }
    this.setState({ showAllignments: true });
  }

  handleShowAllAllignments() {
    if (this.state.showAllAllignments) {
      this.setState({ showAllAllignments: false }, () => {this.computeAllignment();});
      return;
    }
    this.setState({ showAllAllignments: true }, () => {this.computeAllignment();});
  }

  render() {
    const { seq1, seq2, matchScore, mismatchScore, gapScore, minimalistic,algorithm, scoreMatrix, tracebackMatrix, minScore, maxScores, scale, realTime, allignmentList, score, showAllignments, showAllAllignments } = this.state;
    return (
      <Fragment>
        <div className='headlineContainer'>
          <div className='headline'>
            <div className='headlineFragment' >
              <label>Match:</label>
              <input className='numberInput' type='number' step='any' max='20' value={matchScore} onChange={this.handleChangeMatch.bind(this)}/>
            </div>
            <div className='headlineFragment' >
              <label>Mismatch:</label>
              <input className='numberInput' type='number' max='20' value={mismatchScore} onChange={this.handleChangeMismatch.bind(this)}/>
            </div>
            <div className='headlineFragment' >
              <label>Gap:</label>
              <input className='numberInput' type='number' max='20' value={gapScore} onChange={this.handleChangeGap.bind(this)}/>
            </div>
            <div className='headlineFragment' >
              <label>Sequence 1:</label>
              <input className='textInput' type="text"  maxLength='500' spellCheck="false" value={seq1} onChange={this.handleChangeSeq1.bind(this)} />
              <div className='counterSquare'>{seq1.length}</div>
            </div>
            <div className='headlineFragment' >
              <label>Sequence 2:</label>
              <input  className='textInput' type="text" maxLength='500' spellCheck="false" value={seq2} onChange={this.handleChangeSeq2.bind(this)} />
              <div className='counterSquare'>{seq2.length}</div>
            </div>
          </div>
          <div className='statsWrapper'>
            <button className='statsButton'  onClick={() => this.handleShowAllignments()} />
            <div className={showAllignments ? 'statsBar' : 'statsBar off'} >
              <div>
                <div className='scoreDiv'>
                  <label>{'Score'}</label>
                  <div className='rectangle' >{score}</div>
                </div>
                <div className='scoreDiv'>
                  <label>{'Allignments'}</label>
                <div className='rectangle' >{allignmentList.length}</div>
              </div>
              </div>
              <Allignments allignmentList={allignmentList} showAllignments={showAllignments}/>
            </div>
          </div>
          <div className='settingsWrapper'>
            <button className='settingButton' />
            <div className='sideBar'> 
              <select className='selectAlgorithm' value={algorithm} onChange={this.handleSelectAlgorithmChange.bind(this)} >
                <option value={0}> Needleman-Wunsch </option>
                <option value={1}> Needleman-Wunsch-Linear </option>
                <option value={2}> Smith-Waterman </option>
                <option value={3}> Gotoh </option>
              </select>
              <button className='switchContainer' onClick={() => this.handleMiniClick()}>
                <div className={minimalistic ? 'rectangle disabled' : 'rectangle'}>{'Regular'}</div>
                <div className={minimalistic ? 'rectangle' : 'rectangle disabled'}>{'Minimalistic'}</div>
              </button>
              <button className='switchContainer' onClick={() => this.handleShowAllAllignments()}>
                <div className={showAllAllignments ? 'rectangle disabled' : 'rectangle'}>{'one result'}</div>
                <div className={showAllAllignments ? 'rectangle' : 'rectangle disabled'}>{'all results.'}</div>
              </button>
              <div className='slideContainer'>
                <label className='sideBarLabel'>Scale:</label>
                <input type='range' min='0.3' max='1' step='0.1' className='slider' value={scale} onChange={(e) => this.handleScaleSlide(e)}/>
              </div>
              <div className='switchContainer'>
                <button className={realTime ? 'rectangle' : 'rectangle disabled'} onClick={() => this.handleRealTimeClick()}>{'Live-Render'}</button>
                <button className={realTime ? 'rectangle disabled' : 'rectangle'} onClick={() => this.handleRenderClick()}>{'Render'}</button>
              </div>
              <div className='switchContainer'>
                <button className='rectangle' onClick={() => this.handleRandomDNAClick()}>{'random DNA'}</button>
                <button className='rectangle' onClick={() => this.handleRandomAAClick()}>{'random AA'}</button>
              </div>
            </div>
          </div>
        </div>
        <div className='matrixContainer'>
          <Matrix seq1={seq1} seq2={seq2} tracebackMatrix={tracebackMatrix} scoreMatrix={scoreMatrix} minScore={minScore} maxScores={maxScores} minimalistic={minimalistic}/>
        </div>
      </Fragment>
    );
  }
}

export default Allignment;