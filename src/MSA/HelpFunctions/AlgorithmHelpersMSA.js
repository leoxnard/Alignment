// if (maxScore === xyzScore) {
//   traceback[index] = 1;
// } else if (maxScore === xyScore) {
//   traceback[index] = 2;
// } else if (maxScore === xzScore) {
//   traceback[index] = 3;
// } else if (maxScore === yzScore) { 
//   traceback[index] = 4;
// } else if (maxScore === xScore) {
//   traceback[index] = 5;
// } else if (maxScore === yScore) {
//   traceback[index] = 6;
// } else if (maxScore === zScore) {
//   traceback[index] = 7;
// }

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

const gapSymbol = '-'; 
export function getAlignment(traceArray, seq1, seq2, seq3) {
  let seq1Pos = 0;
  let seq2Pos = 0;
  let seq3Pos = 0;
  let str1 = '';
  let str2 = '';
  let str3 = '';
  for (let pos = 0; pos < traceArray.length; pos++) {
    if (traceArray[pos] === 1 || traceArray[pos] === 2 || traceArray[pos] === 3 || traceArray[pos] === 5) {
      str1 += seq1[seq1Pos];
      seq1Pos++;
    } else {
      str1 += gapSymbol;
    }
    if (traceArray[pos] === 1 || traceArray[pos] === 2 || traceArray[pos] === 4 || traceArray[pos] === 6) {
      str2 += seq2[seq2Pos];
      seq2Pos++;
    } else {
      str2 += gapSymbol;
    }
    if (traceArray[pos] === 1 || traceArray[pos] === 3 || traceArray[pos] === 4 || traceArray[pos] === 7) {
      str3 += seq3[seq3Pos];
      seq3Pos++;
    } else {
      str3 += gapSymbol;
    }
  }
  return [[str1, str2, str3]]
}