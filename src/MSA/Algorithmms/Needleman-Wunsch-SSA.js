import { substitutionsMatrixScore, substitutionsMatrixGapScore } from "./Substitutionsmatrices";

export function NeedlemanWunschPlane(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix, diaDir, verDir, horDir) {
  gapScore = substitutionsMatrixGapScore(substitutionsMatrix, gapScore);
  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  const matricesLength = (seq1Length + 1) * (seq2Length + 1);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill(0);

  //first row
  for (let i = 1; i <= seq1Length; i++){
    scores[i] = i * gapScore;
    traceback[i] = horDir;
  }
  
  //first column
  for (let j=1; j <= seq2Length; j++){
    scores[(seq1Length + 1) * j] = j * gapScore;
    traceback[(seq1Length + 1) * j] = verDir;
  }
  
  //rekursion
  let seq1Index = 0;
  let seq2Index = 0;
  for (let pos = (seq1Length + 2); pos < matricesLength; pos++){
    if (pos % (seq1Length + 1) === 0){
      seq1Index = 0;
      seq2Index++;
    } else {
      const diagonalScore = scores[pos - seq1Length - 2] + substitutionsMatrixScore(substitutionsMatrix, seq1[seq1Index], seq2[seq2Index], matchScore, mismatchScore);
      const verticalScore = scores[pos - seq1Length - 1] + gapScore;
      const horizontalScore = scores[pos - 1] + gapScore;
      scores[pos] = Math.max(diagonalScore, verticalScore, horizontalScore);
      if (scores[pos] === diagonalScore) {
        traceback[pos] = diaDir; // d
      } else if (scores[pos] === verticalScore) {
        traceback[pos] = verDir; // v
      } else {
        traceback[pos] = horDir; // h
      }
      seq1Index++;
    }
  }
  return([scores, traceback]);
}