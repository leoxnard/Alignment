import { NeedlemanWunschMSA } from './Needleman-Wunsch-MSA';

// const [scoreMatrix_, path_, pathRanks_, alignmentList_, score_] = computeScores(seq1, seq2, seq3, parseInt(matchScore), parseInt(mismatchScore), parseInt(gapScore), substitutionsMatrix);
export function computeScores(seq1, seq2, seq3, matchScore, mismatchScore, gapScore, gapGapScore, substitutionsMatrix) {
  if (seq1.length === 0 && seq2.length === 0 && seq3.length === 0) {
    return [[], [], [], 0];
  }
  return NeedlemanWunschMSA(seq1, seq2, seq3, matchScore, mismatchScore, gapScore, gapGapScore, substitutionsMatrix);
}