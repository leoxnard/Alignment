import React, { useMemo, useState, Fragment, useEffect } from 'react'
import Matrix from './Components/Matrix';
import { computeScores, computeAlignments } from './Algorithmms/Algorithms'
import { Version } from './Components/Version';
import { Headline } from './Components/Headline'
import { TextInput } from './Components/TextInput';
import { SettingsContainer, SettingsSlideContainer } from './Components/Settings';
import { Select } from './Components/Select';
import { StatsContainer } from './Components/Stats';
import { NumberInput } from './Components/NumberInput';
import { Switch } from './Components/Switch';
import { Button } from './Components/Button';
import { Slide } from './Components/Slide';
import { RandomButtons } from './Components/RandomButtons';

export function Alignment(props) {
  const [algorithm, setAlgorithm] = useState(0);
  const [substitutionsMatrix, setSubstitutionsMatrix] = useState(0);

  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');

  const [matchScore, setMatchScore] = useState('1');
  const [mismatchScore, setMismatchScore] = useState('-1');
  const [gapScore, setGapScore] = useState('-1');
  const [extensionScore, setExtensionScore] = useState('-1');

  const [scoreMatrix, setScoreMatrix] = useState([0,0,0,0]);
  const [tracebackMatrix, setTracebackMatrix] = useState([0,0,0,0]);
  const [alignmentList, setAlignmentList] = useState([]);
  const [alignmentNumber, setAlignmentNumber] = useState(1);
  const [maxScores, setMaxScores] = useState(4);
  const [minScore, setMinScore] = useState(4);
  const [score, setScore] = useState(0);

  const [minimalistic, setMinimalistic] = useState(false);
  const [scale, setScale] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [matrixHeight, setMatrixHeight] = useState(0);
  const [matrixWidth, setMatrixWidth] = useState(0);
  
  useMemo(() => {
    if (!(isNaN(parseInt(matchScore)) || isNaN(parseInt(mismatchScore)) || isNaN(parseInt(gapScore)) || (isNaN(parseInt(extensionScore)) && algorithm === 3))){
      const [scoreMatrix_, minScore_, maxScores_, tracebackMatrix_, alignmentList_, alignmentNumber_, score_] = computeScores(seq1, seq2, parseInt(matchScore), parseInt(mismatchScore), parseInt(gapScore), parseInt(extensionScore), substitutionsMatrix, algorithm);
      setScoreMatrix(scoreMatrix_);
      setTracebackMatrix(tracebackMatrix_);
      setMinScore(minScore_);
      setMaxScores(maxScores_);
      setAlignmentList(alignmentList_);
      setAlignmentNumber(alignmentNumber_);
      setScore(score_);
    }
    document.documentElement.style.setProperty('--square-size', (minimalistic ? '10px' : '50px'));
    document.documentElement.style.setProperty('--row-length', seq1.length + (minimalistic ? 1 : 2));
  }, [seq1, seq2, gapScore, extensionScore, mismatchScore, matchScore, algorithm, substitutionsMatrix, minimalistic]);

  useEffect(() => {
    setMatrixWidth(minimalistic ? ((seq1.length) * 9.5 + 10) : ((seq1.length + 2) * 49.5 + 5));
  }, [seq1, minimalistic])
  
  useEffect(() => {
    setMatrixHeight(minimalistic ? ((seq2.length) * 9.5 + 10) : ((seq2.length + 2) * 49.5 + 5));
  }, [seq2, minimalistic])

  const showAllAlignments = () => {
    setAlignmentList(computeAlignments(tracebackMatrix, seq1, seq2, tracebackMatrix.length - 1, seq1.length - 1, seq2.length - 1));
  };

  return (
    <Fragment>
      <Version value={'v3.0'} />
      <Headline>
        <TextInput label={'Seq 1:'} seq={seq1} handleChange={(e) => setSeq1(e.target.value.toUpperCase())}/>
        <TextInput label={'Seq 2:'} seq={seq2} handleChange={(e) => setSeq2(e.target.value.toUpperCase())}/>
        <StatsContainer showStats={showStats} score={score} alignmentList={alignmentList} alignmentNumber={alignmentNumber} showSettings={showSettings} handleClick={() => setShowStats(!showStats)}/>
        <SettingsContainer showSettings={showSettings} algorithm={algorithm} handleClick={() => setShowSettings(!showSettings)} >
          <Select value={algorithm} options={['Needleman-Wunsch', 'Needleman-Wunsch-Linear', 'Smith-Waterman', 'Gotoh']} handleChange={(e) => setAlgorithm(parseInt(e.target.value))}/>
          <Select value={substitutionsMatrix} options={['Custom', 'Blosumn45', 'Blosumn50', 'Blosumn62', 'Blosumn80']} handleChange={(e) => setSubstitutionsMatrix(parseInt(e.target.value))}/>
          <SettingsSlideContainer show={substitutionsMatrix === 0 ? true : false} position={'calc((var(--box-size) + 30px) * -4)'}>
            <NumberInput label={'Matchscore'} value={matchScore} handleChange={(e) => setMatchScore(e.target.value)}/>
            <NumberInput label={'Mismatchscore'} value={mismatchScore} handleChange={(e) => setMismatchScore(e.target.value)}/>
            <NumberInput label={'Gapscore'} value={gapScore} handleChange={(e) => setGapScore(e.target.value)}/>
            <SettingsSlideContainer show={(substitutionsMatrix !== 0 || algorithm === 3) ? true : false} position={'calc((var(--box-size) + 30px) * -1)'} >
              <NumberInput label={'Extension'} value={extensionScore} handleChange={(e) => setExtensionScore(e.target.value)}/>
              <Switch label1={'Regular'} label2={'Minimalistic'} value={minimalistic} handleClick={(e) => setMinimalistic(!minimalistic)}/>
              <Button label={'all Results'} disabled={alignmentNumber > 1000 ? 1 : 0} handleClick={() => showAllAlignments()}/>
              <Slide label={'Scale'} value={scale} min={'0.3'} max={'1'} step={'0.01'} handleChange={(e) => setScale(e.target.value)} />
              <SettingsSlideContainer show={(substitutionsMatrix === 0) ? true : false} position={'calc((var(--box-size) + 5px) * -1)'} >
                <RandomButtons setSeq1={setSeq1} setSeq2={setSeq2} minimalistic={minimalistic} scale={scale}/>
                <Button label={'three Sequences'} style={{width: 'calc(var(--settingsBar-size) - 30px)'}} handleClick={props.changeMode}/>
              </SettingsSlideContainer>
            </SettingsSlideContainer>
          </SettingsSlideContainer>
        </SettingsContainer>
      </Headline>
      <Matrix 
        seq1={seq1} 
        seq2={seq2} 
        tracebackMatrix={tracebackMatrix} 
        scoreMatrix={scoreMatrix} 
        minScore={minScore} 
        maxScores={maxScores} 
        minimalistic={minimalistic} 
        scale={scale} 
        matrixHeight={matrixHeight * scale} 
        matrixWidth={matrixWidth * scale}/>
    </Fragment>
  )
}

export default Alignment;