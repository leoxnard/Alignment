const matchSymbol = '|'; const mismatchSymbol = '‡'; const gapSymbol = '+';
export function getAlignment(array, seq1, seq2, arrayPos, seq1Pos_, seq2Pos_) {
  let pos = arrayPos;
  let seq1Pos = seq1Pos_;
  let seq2Pos = seq2Pos_;
  let str1 = '';
  let str2 = '';
  let symbols = '';
  while (array[pos] !== 0) {
    if (array[pos] === 3) {
      str1 += seq1[seq1Pos];
      seq1Pos--;
      str2 += '-';
      symbols += gapSymbol;
      pos--;
    } else if (array[pos] === 2 || array[pos] === 6) {
      str1 += '-';
      str2 += seq2[seq2Pos];
      seq2Pos--;
      symbols += gapSymbol;
      pos -= seq1.length + 2;
    } else {
      symbols += (seq1[seq1Pos] === seq2[seq2Pos] ? matchSymbol : mismatchSymbol);      str1 += seq1[seq1Pos];
      seq1Pos--;
      str2 += seq2[seq2Pos];
      seq2Pos--;
      pos -= seq1.length + 3;
    }
  }
  return [[str1.split('').reverse().join(''), str2.split('').reverse().join(''), symbols.split('').reverse().join('')]]
}

export function getAllAlignments(traceArray, seq1, seq2, arrayPos, seq1Pos, seq2Pos) {
  const list = getAllAlignmentsHelp(traceArray, seq1, seq2, arrayPos, seq1Pos, seq2Pos);
  return list.map(subArray => subArray.map(str => str.split('').reverse().join('')));
}

function getAllAlignmentsHelp(traceArray, seq1, seq2, arrayPos, seq1Pos, seq2Pos) {
  const seq1Length = seq1.length
  if (traceArray[arrayPos] === 1) {
    return (
        merge( [ seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol) ] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1)))
        );
  }
  if (traceArray[arrayPos] === 2) {
    return (
        merge( ['-', seq2[seq2Pos], gapSymbol], getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1)))
    );
  }
  if (traceArray[arrayPos] === 3) {
    return (
        merge( [seq1[seq1Pos], '-', gapSymbol], getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
    );
  }
  if (traceArray[arrayPos] === 4) {
    return (
        merge([seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol) ] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1))).concat(
        merge((['-', seq2[seq2Pos], gapSymbol]), getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1)))
        ));
  }
  if (traceArray[arrayPos] === 5) {
    return (
        merge( [seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol) ] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1))).concat(
        merge( [seq1[seq1Pos], '-', gapSymbol] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
        ));
  }
  if (traceArray[arrayPos] === 6) {
    return (
        merge( ['-', seq2[seq2Pos], gapSymbol] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1))).concat(
        merge( [seq1[seq1Pos], '-', gapSymbol] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
        ));
  }
  if (traceArray[arrayPos] === 7) {
    return (
        merge( [seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol)] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1))).concat(
        merge( ['-', seq2[seq2Pos], gapSymbol] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1))),
        merge( [seq1[seq1Pos], '-', gapSymbol] , getAllAlignmentsHelp(traceArray, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
        ));
  }
  return ([['','','']]);
}

function merge(array, multipleArray) {
  let merged = [];
  const [str1a, str2a, symbol1] = array;
  for (let i = 0; i < multipleArray.length; i++) {
      const [str1b, str2b, symbol2] = multipleArray[i];
      merged.push( [ (str1a + str1b) , (str2a + str2b) , (symbol1 + symbol2)] );
  }
  return merged;
}

export function getTraceArray(traceback, seq1Length, starters) {
  const array = new Array(traceback.length).fill(0);
  const gonnaVisit = new Array(traceback.length).fill(0);
  for (let i = 0; i < starters.length; i++) {
    gonnaVisit[starters[i]] = 1;
  }
  for (let pos = traceback.length - 1; pos >= seq1Length + 4; pos--) {
    if (gonnaVisit[pos] === 1) {
      array[pos] = traceback[pos];
      if (traceback[pos] === 1 || traceback[pos] === 4 || traceback[pos] === 5 || traceback[pos] === 7) {
        gonnaVisit[pos - (seq1Length + 2) - 1] = 1;
      }
      if (traceback[pos] === 2 || traceback[pos] === 4 || traceback[pos] === 6 || traceback[pos] === 7) {
        gonnaVisit[pos - (seq1Length + 2)] = 1;
      }
      if (traceback[pos] === 3 || traceback[pos] === 5 || traceback[pos] === 6 || traceback[pos] === 7) {
        gonnaVisit[pos - 1] = 1;
      }
    }
  }
  return array;
}

export function getAlignmentNumber(tracebackMatrix, rowLength, pos, depth = 0) {
  if (depth > 20) {
    //console.log('Recursion limit exceeded');
    return 1; // or return a default value
  }
  if (tracebackMatrix[pos] === 0) {
    return 1;
  }
  let counter = 0;
  if ([1, 4, 5, 7].includes(tracebackMatrix[pos])) {
    counter += getAlignmentNumber(tracebackMatrix, rowLength, pos - rowLength - 1, depth + (tracebackMatrix[pos] === 1 ? 0 : 1));
  }
  if ([2, 4, 6, 7].includes(tracebackMatrix[pos])) {
    counter += getAlignmentNumber(tracebackMatrix, rowLength, pos - rowLength,depth + (tracebackMatrix[pos] === 2 ? 0 : 1));
  }
  if ([3, 5, 6, 7].includes(tracebackMatrix[pos])) {
    counter += getAlignmentNumber(tracebackMatrix, rowLength, pos - 1, depth + (tracebackMatrix[pos] === 3 ? 0 : 1));
  }
  return counter;
}
