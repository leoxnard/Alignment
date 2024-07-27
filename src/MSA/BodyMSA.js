import React, { useMemo, useState, Fragment } from 'react'
import Matrix from './Components/MatrixMSA';
import { computeScores } from './Algorithmms/Algorithms'
import { Version } from './Components/VersionMSA';
import { Headline } from './Components/HeadlineMSA'
import { TextInput } from './Components/TextInputMSA';
import { SettingsContainer, SettingsSlideContainer } from './Components/SettingsMSA';
import { Select } from './Components/SelectMSA';
import { StatsContainer } from './Components/StatsMSA';
import { NumberInput } from './Components/NumberInput';
import { RandomButtons } from './Components/RandomButtonsMSA';
import { Button } from './Components/ButtonMSA';

export function MSA(props) {
  const [substitutionsMatrix, setSubstitutionsMatrix] = useState(0);

  const [seq1, setSeq1] = useState('A');
  const [seq2, setSeq2] = useState('A');
  const [seq3, setSeq3] = useState('A');

  const [matchScore, setMatchScore] = useState('2');
  const [mismatchScore, setMismatchScore] = useState('-1');
  const [gapScore, setGapScore] = useState('-1');
  const [gapGapScore, setGapGapScore] = useState('0');

  const [alignmentList, setAlignmentList] = useState([]);
  const [pathRanks, setPathRanks] = useState([]);

  const [path, setPath] = useState([]);
  const [score, setScore] = useState(0);

  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [randomSize, setRandomSize] = useState(20);
  
  useMemo(() => {
    if (!(isNaN(parseInt(matchScore)) || isNaN(parseInt(mismatchScore)) || isNaN(parseInt(gapScore))) ){
      const [path_, pathRanks_, alignmentList_, score_] = computeScores(seq1, seq2, seq3, parseInt(matchScore), parseInt(mismatchScore), parseInt(gapScore), parseInt(gapGapScore), substitutionsMatrix);
      setPath(path_);
      setPathRanks(pathRanks_)
      setAlignmentList(alignmentList_);
      setScore(score_);
    }
  }, [seq1, seq2, seq3, gapScore, gapGapScore, mismatchScore, matchScore, substitutionsMatrix]);

  // const showAllAlignments = () => {
  //   // setAlignmentList(computeAlignments(tracebackMatrix, sequences, tracebackMatrix.length - 1));
  // };



  return (
    <Fragment>
      <Version value={'v3.0'} />
      <Headline>
        <TextInput label={'Seq 1:'} seq={seq1} handleChange={(e) => setSeq1(e.target.value.toUpperCase())}/>
        <TextInput label={'Seq 2:'} seq={seq2} handleChange={(e) => setSeq2(e.target.value.toUpperCase())}/>
        <TextInput label={'Seq 2:'} seq={seq3} handleChange={(e) => setSeq3(e.target.value.toUpperCase())}/>
        <StatsContainer showStats={showStats} score={score} alignmentList={alignmentList} showSettings={showSettings} handleClick={() => setShowStats(!showStats)}/>
        <SettingsContainer showSettings={showSettings} handleClick={() => setShowSettings(!showSettings)} >
          <Select value={substitutionsMatrix} options={['Custom', 'Blosumn45', 'Blosumn50', 'Blosumn62', 'Blosumn80']} handleChange={(e) => setSubstitutionsMatrix(parseInt(e.target.value))}/>
          <SettingsSlideContainer show={substitutionsMatrix === 0 ? true : false} position={'calc((var(--box-size) + 30px) * -4)'}>
            <NumberInput label={'Match-score'} value={matchScore} handleChange={(e) => setMatchScore(e.target.value)}/>
            <NumberInput label={'Mismatch-score'} value={mismatchScore} handleChange={(e) => setMismatchScore(e.target.value)}/>
            <NumberInput label={'Gap-score'} value={gapScore} handleChange={(e) => setGapScore(e.target.value)}/>
            <NumberInput label={'Gap-gap-score'} value={gapGapScore} handleChange={(e) => setGapGapScore(e.target.value)}/>
            <RandomButtons setSeq1={setSeq1} setSeq2={setSeq2} setSeq3={setSeq3} randomSize={randomSize} handleChange={(e) => setRandomSize(e.target.value)}/>
          </SettingsSlideContainer>
          <Button label={'two Sequences'} style={{width: 'calc(var(--settingsBar-size) - 30px)'}} handleClick={props.changeMode}/>
        </SettingsContainer>
      </Headline>
      <Matrix 
        seq1={seq1} 
        seq2={seq2}
        seq3={seq3}
        tracebackMatrix={[1,1,1,1,1]} 
        scoreMatrix={[1,1,1,1]} 
        minScore={1} 
        maxScores={1}
        path={path}
        pathRanks={pathRanks}
      />
    </Fragment>
  )
}

export default MSA;