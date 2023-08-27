import { substitutionsMatrixScore, substitutionsMatrixGapScore, substitutionsMatrixGapGapScore } from "./Substitutionsmatrices";
import { NeedlemanWunschPlane } from "./Needleman-Wunsch-SSA";
import { getAlignment } from '../HelpFunctions/AlgorithmHelpersMSA';

// x in 1 2 3 5
// y in 1 2 4 6
// z in 1 3 4 7

// xyz 1
// xy 2
// xz 3
// yz 4
// x 5
// y 6
// z 7

export function NeedlemanWunschMSA(seq1, seq2, seq3, matchScore, mismatchScore, gapScore, gapGapScore, substitutionsMatrix) {
  gapScore = substitutionsMatrixGapScore(substitutionsMatrix, gapScore);
  gapGapScore = substitutionsMatrixGapGapScore(substitutionsMatrix, gapGapScore);

  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  const seq3Length = seq3.length;
  const matricesLength = (seq1Length + 1) * (seq2Length + 1) * (seq3Length + 1);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill(0);

  // xy initialisierung
  let [planeScore, planeTraceback] = NeedlemanWunschPlane(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix, 2, 6, 5);
  for (let i = 0; i < planeScore.length; i++){
    scores[i] = planeScore[i];
    traceback[i] = planeTraceback[i];
  }
  
  // xz initialisierung
  [planeScore, planeTraceback] = NeedlemanWunschPlane(seq1, seq3, matchScore, mismatchScore, gapScore, substitutionsMatrix, 3, 7, 5);
  for (let z=1; z <= seq3Length; z++){
    for (let x=0; x <= seq1Length; x++){
      scores[z * (seq1Length + 1) * (seq2Length + 1) + x] = planeScore[z * (seq1Length + 1) + x];
      traceback[z * (seq1Length + 1) * (seq2Length + 1) + x] = planeTraceback[z * (seq1Length + 1) + x];
    }
  }

  // yz initialisierung
  [planeScore, planeTraceback] = NeedlemanWunschPlane(seq2, seq3, matchScore, mismatchScore, gapScore, substitutionsMatrix, 4, 7, 6);
  for (let z=1; z <= seq3Length; z++){
    for (let y=1; y <= seq2Length; y++){
      scores[z * (seq1Length + 1) * (seq2Length + 1) + y * (seq1Length + 1)] = planeScore[z * (seq2Length + 1) + y];
      traceback[z * (seq1Length + 1) * (seq2Length + 1) + y * (seq1Length + 1)] = planeTraceback[z * (seq2Length + 1) + y];
    }
  }

  const getSMS = ((i, j) => {
    return (substitutionsMatrixScore(substitutionsMatrix, i, j, matchScore, mismatchScore))
  })

  const getIndex = ((x, y, z) => {
    return (z * (seq1Length + 1) * (seq2Length + 1) + y * (seq1Length + 1) + x)
  })

  //rekursion
  for (let z = 1; z <= seq3Length; z++) { // seq3Index
    for (let y = 1; y <= seq2Length; y++) { // seq2Index
      for (let x = 1; x <= seq1Length; x++) { // seq1Index
        const index = getIndex(x, y, z);
        const xyzScore = scores[getIndex(x - 1, y - 1, z - 1)]
          + getSMS(seq1[x - 1], seq2[y - 1])
          + getSMS(seq1[x - 1], seq3[z - 1])
          + getSMS(seq2[y - 1], seq3[z - 1])
        const xyScore = scores[getIndex(x - 1, y - 1, z)]
          + getSMS(seq1[x - 1], seq2[y - 1])
          + 2 * gapScore;
        const xzScore = scores[getIndex(x - 1, y, z - 1)]
          + getSMS(seq1[x - 1], seq3[z - 1])
          + 2 * gapScore;
        const yzScore = scores[getIndex(x, y - 1, z - 1)]
          + getSMS(seq2[y - 1], seq3[z - 1])
          + 2 * gapScore;
        const xScore = scores[getIndex(x - 1, y, z)]
          + 2 * gapScore
          + gapGapScore;
        const yScore = scores[getIndex(x, y - 1, z)]
          + 2 * gapScore
          + gapGapScore;
        const zScore = scores[getIndex(x, y, z - 1)]
          + 2 * gapScore
          + gapGapScore;
        
        const maxScore = Math.max(xyzScore, xyScore, xzScore, yzScore, xScore, yScore, zScore);
        scores[index] = maxScore;
        if (maxScore === xyzScore) {
          traceback[index] = 1;
        } else if (maxScore === xyScore) {
          traceback[index] = 2;
        } else if (maxScore === xzScore) {
          traceback[index] = 3;
        } else if (maxScore === yzScore) { 
          traceback[index] = 4;
        } else if (maxScore === xScore) {
          traceback[index] = 5;
        } else if (maxScore === yScore) {
          traceback[index] = 6;
        } else {
          traceback[index] = 7;
        }
      }
    }
  }

  // traceback
  let path = [];
  let pathRanks = [];

  let pos = matricesLength - 1;
  while (pos > 0) {
    path.push(traceback[pos]);
    pathRanks.push(scores[pos]);
    if (traceback[pos] === 1) {
      pos -= (seq1Length + 1) * (seq2Length + 1) + seq1Length + 2;
    } else if (traceback[pos] === 2) {
      pos -= seq1Length + 2;
    } else if (traceback[pos] === 3) {
      pos -= (seq1Length + 1) * (seq2Length + 1) + 1;
    } else if (traceback[pos] === 4) {
      pos -= (seq1Length + 1) * (seq2Length + 1) + seq1Length + 1;
    } else if (traceback[pos] === 5) {
      pos -= 1;
    } else if (traceback[pos] === 6) {
      pos -= seq1Length + 1;
    } else {
      pos -= (seq1Length + 1) * (seq2Length + 1);
    }
  }

  pathRanks.push(0)

  const [maxScore, minScore] = [Math.max(...pathRanks), Math.min(...pathRanks)];
  if (maxScore === minScore) {
    pathRanks = pathRanks.map(() => 0);
  } else {
    pathRanks = pathRanks.map((score) => {
      return (Math.floor((score - minScore) / (maxScore - minScore) * 10));
    });
  }
  return([path.reverse(), pathRanks.reverse(), getAlignment(path, seq1, seq2, seq3), scores[matricesLength - 1]]);
}