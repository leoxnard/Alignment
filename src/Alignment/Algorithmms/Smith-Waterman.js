import { getAlignment, getAlignmentNumber, getTraceArray } from "../HelpFunctions/AlgorithmHelpers";
import { substitutionsMatrixScore } from "./Substitutionsmatrices";

export function SmithWaterman(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix) {
  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  let maxScores = [seq1Length + 3];
  const matricesLength = (seq1Length + 2) * (seq2Length + 2);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill(0);

  //rekursion
  for (let pos = (seq1Length + 3) * 2; pos <= matricesLength; pos++){
    if (!( (pos % (seq1Length + 2) === 0) || (pos % (seq1Length + 2) === 1) )){
      const diagonalScore = scores[(pos - (seq1Length + 3))] + substitutionsMatrixScore(substitutionsMatrix, seq1[pos % (seq1Length + 2) - 2], seq2[Math.floor(pos / (seq1Length + 2)) - 2], matchScore, mismatchScore);
      const verticalScore = scores[pos - (seq1Length + 2)] + gapScore;
      const horizontalScore = scores[pos - 1] + gapScore;
      scores[pos] = Math.max(diagonalScore, verticalScore, horizontalScore, 0);
      if (scores[pos] !== 0) {
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
      }
      if (scores[pos] > scores[maxScores[0]]) {
        maxScores = [pos];
      } else if (scores[pos] === scores[maxScores[0]]) {
        maxScores.push(pos);
      }
    }
  }

  const array = getTraceArray(traceback, seq1Length, maxScores)
  let alignments = [];
  for (let i = 0; i < maxScores.length; i++) {
    alignments = alignments.concat(getAlignment(array, seq1, seq2, maxScores[i], maxScores[i] % (seq1Length + 2) - 2, Math.floor(maxScores[i] / (seq1Length + 2) - 2)));
  }
  // const alignmentsFilter = alignments.filter((alignment) => {return (alignment[0].length > 0)});
  return([scores, seq1Length + 3, maxScores, array, alignments, getAlignmentNumber(traceback, seq1Length + 2, matricesLength - 1), scores[maxScores[0]] ]);
}