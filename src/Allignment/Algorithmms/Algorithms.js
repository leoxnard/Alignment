import { NeedlemanWunsch } from "./Needleman-Wunsch";
import { NeedlemanWunschLinear } from "./Needleman-Wunsch-Linear";
import { SmithWaterman } from "./Smith-Waterman";
import { Gotoh } from "./Gotoh";
import { substitutionsMatrixGapScore } from "./Substitutionsmatrices";
import { getAllAlignments } from '../HelpFunctions/AlgorithmHelpers';

// return [scoreMatrix_, minScore_, maxScores_, tracebackMatrix_, alignmentList_, alignmentNumber_, score_]
export function computeScores(seq1, seq2, matchScore, mismatchScore, gapScore_, extensionScore, substitutionsMatrix, algorithmms, showAllAlignments) {
  if (seq1.length === 0 && seq2.length === 0) {return ([[0,0,0,0], 4, [4], [['','',''],['','',''],['','',''],['','','']], [], 0, 0])}
  const gapScore = substitutionsMatrixGapScore(substitutionsMatrix, gapScore_);
  if (algorithmms === 0) {
    return NeedlemanWunsch(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix);
  } else if (algorithmms === 1) {
    return NeedlemanWunschLinear(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix);
  } else if (algorithmms === 2){
    return SmithWaterman(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix);
  } else if (algorithmms === 3){
    return Gotoh(seq1, seq2, matchScore, mismatchScore, gapScore, extensionScore, substitutionsMatrix);
  }
  return;
}

export function computeAlignments(traceArray, seq1, seq2, arrayPos, seq1Pos, seq2Pos){
  return getAllAlignments(traceArray, seq1, seq2, arrayPos, seq1Pos, seq2Pos);
}