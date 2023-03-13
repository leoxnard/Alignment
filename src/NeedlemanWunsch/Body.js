import React, { Component, Fragment } from 'react'
import './Body.css';
import './Matrix.css';
import {computeScores} from './Algorithmms/NWSW'
import {randomAASequence, randomDNASequence} from './HelpFunctions/helpers'
import Matrix from './Components/Matrix';
import Allignments from './Components/Allignments';

export class Allignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seq1: '',
      seq2: '',
      scoreMatrix: [0,0,0,0],
      tracebackMatrix: [0,0,0,0],
      allignmentList: [],
      gapPenalties: '-1',
      mismatchScore: '-1',
      matchScore: '1',
      maxScores: 4,
      minScore: 4,
      score: 0,
      minimalistic: false,
      local: false,
      realTime: true,
      scale: 1,
      linearSpace: false,
      showAllignments: false,
      ShowAllAllignments: false,
    };
  }

  computeAllignment() {
    if (!(isNaN(parseInt(this.state.matchScore)) || isNaN(parseInt(this.state.mismatchScore)) || isNaN(parseInt(this.state.gapPenalties)))){
      const [scoreMatrix, minScore, maxScores, tracebackMatrix, allignmentList, score] = computeScores(this.state.seq1, this.state.seq2, parseInt(this.state.matchScore), parseInt(this.state.mismatchScore), parseInt(this.state.gapPenalties), this.state.local, this.state.linearSpace, this.state.ShowAllAllignments);
      this.setState({scoreMatrix: scoreMatrix, tracebackMatrix: tracebackMatrix, minScore: minScore, maxScores: maxScores, allignmentList: allignmentList, score: score});
    }
  }

  handleChangeSeq1(e) {
    if (this.state.realTime) {
      this.setState({ seq1:  e.target.value.toUpperCase()}, () => {
        this.computeAllignment();
      })
    } else {
      this.setState({ seq1: e.target.value.toUpperCase() })
    }
  }

  handleChangeSeq2(e) {
    if (this.state.realTime) {
      this.setState({ seq2:  e.target.value.toUpperCase()}, () => {
        this.computeAllignment();
      })
    } else {
      this.setState({ seq2: e.target.value.toUpperCase() })
    }
  }

  handleChangeMatch(e) {
    if (this.state.realTime) {
      this.setState({ matchScore: e.target.value }, () => {
          this.computeAllignment();
      })
    } else {
      this.setState({ matchScore: e.target.value });
    }
  }

  handleChangeMismatch(e) {
    if (this.state.realTime) {
      this.setState({ mismatchScore: e.target.value }, () => {
          this.computeAllignment();
      })
    } else {
      this.setState({ mismatchScore: e.target.value });
    }
  }

  handleChangeGap(e) {
    if (this.state.realTime) {
      this.setState({ gapPenalties: e.target.value }, () => {
          this.computeAllignment();
      })
    } else {
      this.setState({ gapPenalties: e.target.value });
    }
  }

  handleMiniClick() {
    if (this.state.minimalistic){
      this.setState({minimalistic: false});
    }else{
      this.setState({minimalistic: true});
    }
  }

  handleRealTimeClick() {
    if (this.state.realTime){
      this.setState({realTime: false});
    }else{
      this.setState({realTime: true}, () => {
        this.computeAllignment();
      });
    }
  }

  handleRenderClick() {
    if (!this.state.realTime) {
      this.computeAllignment();
    }
  }

  handleLocalClick() {
    if (this.state.realTime){
      if (this.state.local){
        this.setState({local: false}, () => {
          this.computeAllignment();
        });
      }else{
        this.setState({local: true}, () => {
          this.computeAllignment();
        });
      }
    } else {
      if (this.state.local){
        this.setState({local: false});
      }else{
        this.setState({local: true});
      }
    }
  }

  handleLinearClick() {
    if (this.state.realTime && !this.state.local){
      if (this.state.linearSpace){
        this.setState({linearSpace: false}, () => {
          this.computeAllignment();
        });
      }else{
        this.setState({linearSpace: true}, () => {
          this.computeAllignment();
        });
      }
    } else if (!this.state.local) {
      if (this.state.linearSpace){
        this.setState({linearSpace: false});
      }else{
        this.setState({linearSpace: true});
      }
    }
  }

  handleRandomAAClick() {
    let seq1; let seq2;
    if (this.state.minimalistic){
      seq1 = randomAASequence(Math.floor(window.innerWidth) / (this.state.scale * 10) - (6 / this.state.scale));
      seq2 = randomAASequence(Math.floor(window.innerHeight * 1) / (this.state.scale * 11) - (4 / this.state.scale));
    } else {
      seq1 = randomAASequence(Math.floor(window.innerWidth) / (this.state.scale * 51) - 3);
      seq2 = randomAASequence(Math.floor(window.innerHeight / (this.state.scale * 50) - ((5*3) / (this.state.scale * 4))));
    }
    this.setState({ seq1: seq1, seq2: seq2 }, () => {
      this.computeAllignment();
    })
  }

  handleRandomDNAClick() {
    let seq1; let seq2;
    if (this.state.minimalistic){
      seq1 = randomDNASequence(Math.floor(window.innerWidth) / (this.state.scale * 10) - (6 / this.state.scale));
      seq2 = randomDNASequence(Math.floor(window.innerHeight * 1) / (this.state.scale * 11) - (4 / this.state.scale));
    } else {
      seq1 = randomDNASequence(Math.floor(window.innerWidth) / (this.state.scale * 51) - 3);
      seq2 = randomDNASequence(Math.floor(window.innerHeight / (this.state.scale * 50) - ((5*3) / (this.state.scale * 4))));
    }
    this.setState({ seq1: seq1, seq2: seq2 }, () => {
      this.computeAllignment();
    })
  }

  handleScaleSlide(e) {
    this.setState({ scale: e.target.value }, () => {
      document.documentElement.style.setProperty('--matrix-scale', e.target.value);
    })
  }

  handleShoweAllignments() {
    if (this.state.showAllignments) {
      this.setState({ showAllignments: false });
    } else {
      this.setState({ showAllignments: true });
    }
  }

  render() {
    const { seq1, seq2, matchScore, mismatchScore, gapPenalties, local, minimalistic, linearSpace, scoreMatrix, tracebackMatrix, minScore, maxScores, scale, realTime, allignmentList, score, showAllignments } = this.state;
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
              <input className='numberInput' type='number' max='20' value={gapPenalties} onChange={this.handleChangeGap.bind(this)}/>
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
            <button className='statsButton'  onClick={() => this.handleShoweAllignments()} />
            <div className={showAllignments ? 'statsBar' : 'statsBar off'} >
              <div className='scoreDiv'>
                <label>{'Score'}</label>
                <div className='rectangle' >{score}</div>
              </div>
              <Allignments allignmentList={allignmentList} showAllignments={showAllignments}/>
            </div>
          </div>
          <div className='settingsWrapper'>
            <button className='settingButton' />
            <div className='sideBar'>
              <button className='switchContainer'  onClick={() => this.handleLocalClick()}>
                <div className={local ? 'rectangle disabled' : 'rectangle'}>{'Global'}</div>
                <div className={local ? 'rectangle' : 'rectangle disabled'}>{'Local'}</div>
              </button>
              <button className='switchContainer'  onClick={() => this.handleLinearClick()}>
                <div className={linearSpace ? 'rectangle disabled' : local ? 'rectangle disabled' : 'rectangle'}>{'non-Linear'}</div>
                <div className={linearSpace ? ( local ? 'rectangle disabled' : 'rectangle') : 'rectangle disabled'}>{'Linear'}</div>
              </button>
              <button className='switchContainer' onClick={() => this.handleMiniClick()}>
                <div className={minimalistic ? 'rectangle disabled' : 'rectangle'}>{'Regular'}</div>
                <div className={minimalistic ? 'rectangle' : 'rectangle disabled'}>{'Minimalistic'}</div>
              </button>
              <div className='slideContainer'>
                <label className='sideBarLabel'>Scale:</label>
                <input type='range' min='0.1' max='1' step='0.1' className='slider' value={scale} onChange={(e) => this.handleScaleSlide(e)}/>
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