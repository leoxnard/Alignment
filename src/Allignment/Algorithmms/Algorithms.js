import { NeedlemanWunsch } from "./Needleman-Wunsch";
import { NeedlemanWunschLinear } from "./Needleman-Wunsch-Linear";
import { SmithWaterman } from "./Smith-Waterman";
import { Gotoh } from "./Gotoh";

export function computeScores(seq1, seq2, matchScore, mismatchScore, gapScore, extensionScore, algorithmms, showAllAllignments) {
  if (seq1.length === 0 && seq2.length === 0) {return ([[0,0,0,0], 4, [4], [['','',''],['','',''],['','',''],['','','']], [], 0])}
  if (algorithmms === 0) {
    return NeedlemanWunsch(seq1, seq2, matchScore, mismatchScore, gapScore, showAllAllignments);
  } else if (algorithmms === 1) {
    return NeedlemanWunschLinear(seq1, seq2, matchScore, mismatchScore, gapScore, showAllAllignments);
  } else if (algorithmms === 2){
    return SmithWaterman(seq1, seq2, matchScore, mismatchScore, gapScore, showAllAllignments);
  } else if (algorithmms === 3){
    return Gotoh(seq1, seq2, matchScore, mismatchScore, gapScore, extensionScore, showAllAllignments);
  }
  return;
}










