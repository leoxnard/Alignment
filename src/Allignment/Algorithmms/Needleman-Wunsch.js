import { getAllignment, getAllAllignments, getTraceArray } from "../HelpFunctions/AlgorithmHelpers";
import { substitutionsMatrixScore } from "./Substitutionsmatrices";

export function NeedlemanWunsch(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix, showAllAllignments) {
  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  let maxScores = [seq1Length + 3];
  let minScore = seq1Length + 3;
  const matricesLength = (seq1Length + 2) * (seq2Length + 2);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill(0);

  //first row
  for (let i = 1; i <= seq1Length; i++){
    scores[seq1Length + 3 + i] = i * gapScore;
    traceback[seq1Length + 3 + i] = 3;
    if (scores[seq1Length + 3 + i] === scores[maxScores[0]]) {
      maxScores.push(seq1Length + 3 + i);
    }
  }
  if (scores[seq1Length * 2 + 3] > scores[maxScores[0]]) {
    maxScores = [seq1Length * 2 + 3];
  } else if (scores[seq1Length * 2 + 3] < scores[minScore]) {
    minScore = seq1Length * 2 + 3;
  }
  
  //first column
  for (let j=1; j <= seq2Length; j++){
    scores[(seq1Length + 2) * (j + 1) + 1] = j * gapScore;
    traceback[(seq1Length + 2) * (j + 1) + 1] = 2;
    if (scores[(seq1Length + 2) * (j + 1) + 1] === scores[maxScores[0]]) {
      maxScores.push((seq1Length + 2) * (j + 1) + 1);
    }
  }
  if (scores[(seq1Length + 2) * (seq2Length + 1) + 1] > scores[maxScores[0]]) {
    maxScores = [(seq1Length + 2) * (seq2Length + 1) + 1];
  } else if (scores[(seq1Length + 2) * (seq2Length + 1) + 1] < scores[minScore]) {
    minScore = (seq1Length + 2) * (seq2Length + 1) + 1;
  }

  //rekursion
  for (let pos = (seq1Length + 3) * 2; pos <= matricesLength; pos++){
    if (!( (pos % (seq1Length+2) === 0) || (pos % (seq1Length+2) === 1) )){
      const diagonalScore = scores[(pos - (seq1Length + 3))] + substitutionsMatrixScore(substitutionsMatrix, seq1[pos % (seq1Length + 2) - 2], seq2[Math.floor(pos / (seq1Length + 2)) - 2], matchScore, mismatchScore);
      const verticalScore = scores[pos - (seq1Length + 2)] + gapScore;
      const horizontalScore = scores[pos - 1] + gapScore;
      scores[pos] = Math.max(diagonalScore, verticalScore, horizontalScore);
      if (scores[pos] === diagonalScore) {
        traceback[pos] = 1; // d
      }
      if (scores[pos] === verticalScore) {
        if (traceback[pos] === 0) {
          traceback[pos] = 2; // v
        } else {
          traceback[pos] = 4; // dv
        }
      }
      if (scores[pos] === horizontalScore) {
        if (traceback[pos] === 0) {
          traceback[pos] = 3; // h
        } else if (traceback[pos] === 1) {
          traceback[pos] = 5; // dh
        } else if (traceback[pos] === 2) {
          traceback[pos] = 6; // vh
        } else {
          traceback[pos] = 7; // vdh
        }
      }
      if (scores[pos] > scores[maxScores[0]]) {
        maxScores = [pos];
      } else if (scores[pos] === scores[maxScores[0]]) {
        maxScores.push(pos);
      } else if (scores[pos] < scores[minScore]) {
        minScore = pos;
      }
    }
  }
  
  const array = getTraceArray(traceback, seq1Length, [matricesLength - 1]);
  let allignments;
  if (showAllAllignments) {
    allignments = getAllAllignments(array, seq1, seq2, matricesLength - 1, seq1Length - 1, seq2Length - 1);
  } else {
    allignments = getAllignment(array, seq1, seq2, matricesLength - 1, seq1Length - 1, seq2Length - 1);
  }
  allignments = allignments.map(subArray => subArray.map(str => str.split('').reverse().join('')));
  return([scores, minScore, maxScores, array, allignments, scores[matricesLength - 1]]);
}