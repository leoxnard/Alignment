// 0 => diagonal
// 1 => vertical
// 2 => horizontal

// RZJURTZJUQr
// AWDRGWQ3QRWERt

export function computeScores(seq1, seq2, matchScore, mismatchScore, gapPenalties, local, linearSpace, showAllAllignments) {
  if (seq1.length === 0 && seq2.length === 0) {return ([[0,0,0,0], 4, [4], [['','',''],['','',''],['','',''],['','','']], [], 0])}
  if (!local && !linearSpace) {
    return NeedlemanWunsch(seq1, seq2, matchScore, mismatchScore, gapPenalties, showAllAllignments);
  } else if (!local) {
    return NeedlemanWunschLinear(seq1, seq2, matchScore, mismatchScore, gapPenalties, showAllAllignments);
  } else {
    return SmithWaterman(seq1, seq2, matchScore, mismatchScore, gapPenalties, showAllAllignments);
  }
}

function NeedlemanWunsch(seq1, seq2, matchScore, mismatchScore, gapPenalties, showAllAllignments) {
  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  let maxScores = [seq1Length + 3];
  let minScore = seq1Length + 3;
  const matricesLength = (seq1Length + 2) * (seq2Length + 2);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill(0);

  //first row
  for (let i = 1; i <= seq1Length; i++){
    scores[seq1Length + 3 + i] = i*gapPenalties;
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
    scores[(seq1Length + 2) * (j + 1) + 1] = j * gapPenalties;
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
      const diagonalScore = scores[(pos - (seq1Length + 3))] + (seq1[pos % (seq1Length+2) - 2] === seq2[Math.floor(pos / (seq1Length + 2)) - 2] ? matchScore : mismatchScore);
      const verticalScore = scores[pos - (seq1Length + 2)] + gapPenalties;
      const horizontalScore = scores[pos - 1] + gapPenalties;
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

function SmithWaterman(seq1, seq2, matchScore, mismatchScore, gapPenalties, showAllAllignments) {
  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  let maxScores = [seq1Length + 3];
  const matricesLength = (seq1Length + 2) * (seq2Length + 2);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill(0);

  //rekursion
  for (let pos = (seq1Length + 3) * 2; pos <= matricesLength; pos++){
    if (!( (pos % (seq1Length + 2) === 0) || (pos % (seq1Length + 2) === 1) )){
      const diagonalScore = scores[(pos - (seq1Length + 3))] + ((seq1[pos % (seq1Length+2) - 2] === seq2[Math.floor(pos / (seq1Length + 2)) - 2]) ? matchScore : mismatchScore);
      const verticalScore = scores[pos - (seq1Length + 2)] + gapPenalties;
      const horizontalScore = scores[pos - 1] + gapPenalties;
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
  let allignments = [];
  if (showAllAllignments) {
    for (let i = 0; i < maxScores.length; i++) {
      allignments = allignments.concat(getAllAllignments(array, seq1, seq2, maxScores[i], maxScores[i] % (seq1Length + 2) - 2, Math.floor(maxScores[i] / (seq1Length + 2) - 2)));
    }
  } else {
    for (let i = 0; i < maxScores.length; i++) {
      allignments = allignments.concat(getAllignment(array, seq1, seq2, maxScores[i], maxScores[i] % (seq1Length + 2) - 2, Math.floor(maxScores[i] / (seq1Length + 2) - 2)));
    }
  }
  const allignmentsFilter = allignments.filter((allignment) => {return (allignment[0].length > 0)});
  const allignmentsRev = allignmentsFilter.map(subArray => subArray.map(str => str.split('').reverse().join('')));
  return([scores, seq1Length + 3, maxScores, array, allignmentsRev, scores[maxScores[0]] ]);
}

function NeedlemanWunschLinear(seq1, seq2, matchScore, mismatchScore, gapPenalties, showAllAllignments) {
  if (seq1.length === 0 && seq2.length === 0) { return([['','','',''], 3, 3, [0,0,0,0]]);}
  const matrixLength = (seq1.length + 2) * (seq2.length + 2);
  const coordinates = [[0, 0, 3], ...getCoordinates(matchScore, mismatchScore, gapPenalties, seq1, seq2, 0, seq1.length, 0, seq2.length)];
  const tracebackMatrix = new Array(matrixLength).fill(0);
  for (let i = 0; i < coordinates.length; i++) {
    const [x, y, direction] = coordinates[i];
    if (direction === 0) {
      tracebackMatrix[(seq1.length + 2) * (y+1) + (x+1)] = 1;
    } else if (direction === 1) {
      tracebackMatrix[(seq1.length + 2) * (y+1) + (x+1)] = 2;
    } else if (direction === 2) {
      tracebackMatrix[(seq1.length + 2) * (y+1) + (x+1)] = 3;
    }
  }
  //console.table(tracebackMatrix)
  let allignments;
  if (showAllAllignments) {
    allignments = getAllAllignments(tracebackMatrix, seq1, seq2, matrixLength - 1, seq1.length - 1, seq2.length - 1);
  } else {
    allignments = getAllignment(tracebackMatrix, seq1, seq2, matrixLength - 1, seq1.length - 1, seq2.length - 1);
  }
  const allignmentsRev = allignments.map(subArray => subArray.map(str => str.split('').reverse().join('')));
  return ([ new Array(matrixLength).fill(''), 0, 0, tracebackMatrix, allignmentsRev, getScoreLinear(matchScore, mismatchScore, gapPenalties, seq1, seq2) ]);
}

function getTraceArray(traceback, seq1Length, starters) {
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

const matchSymbol = '|'; const mismatchSymbol = '‡'; const gapSymbol = '+';
function getAllignment(array, seq1, seq2, arrayPos, seq1Pos_, seq2Pos_) {
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
  return [[str1, str2, symbols]]
}

function getAllAllignments(array, seq1, seq2, arrayPos, seq1Pos, seq2Pos) {
  const seq1Length = seq1.length
  if (array[arrayPos] === 1) {
    return (
        merge( [ seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol) ] , getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1)))
        );
  }
  if (array[arrayPos] === 2) {
    return (
        merge( ['-', seq2[seq2Pos], gapSymbol], getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1)))
    );
  }
  if (array[arrayPos] === 3) {
    return (
        merge( [seq1[seq1Pos], '-', gapSymbol], getAllAllignments(array, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
    );
  }
  if (array[arrayPos] === 4) {
    return (
        merge([seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol) ] , getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1))).concat(
        merge((['-', seq2[seq2Pos], gapSymbol]), getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1)))
        ));
  }
  if (array[arrayPos] === 5) {
    return (
        merge( [seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol) ] , getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1))).concat(
        merge( [seq1[seq1Pos], '-', gapSymbol] , getAllAllignments(array, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
        ));
  }
  if (array[arrayPos] === 6) {
    return (
        merge( ['-', seq2[seq2Pos], gapSymbol] , getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1))).concat(
        merge( [seq1[seq1Pos], '-', gapSymbol] , getAllAllignments(array, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
        ));
  }
  if (array[arrayPos] === 7) {
    return (
        merge( [seq1[seq1Pos], seq2[seq2Pos], ((seq1[seq1Pos] === seq2[seq2Pos]) ? matchSymbol : mismatchSymbol)] , getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 3), (seq1Pos - 1), (seq2Pos - 1))).concat(
        merge( ['-', seq2[seq2Pos], gapSymbol] , getAllAllignments(array, seq1, seq2, (arrayPos - seq1Length - 2), seq1Pos, (seq2Pos - 1))),
        merge( [seq1[seq1Pos], '-', gapSymbol] , getAllAllignments(array, seq1, seq2, (arrayPos - 1), (seq1Pos - 1), seq2Pos))
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

function getCoordinates(matchScore, mismatchScore, gapPenalties, seq1, seq2, seq1Start, seq1End, seq2Start, seq2End) {
  const columnLength = (seq2End - seq2Start + 1);
  const rowLength = (seq1End - seq1Start + 1);
  if (rowLength === 1) {
    let result = [];
    for (let i = 1; i < columnLength ; i++) {
      result.push([seq1Start, seq2Start + i, 1]);
    }
    return result;
  } else if (columnLength === 1) {
     //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let result = [];
    for (let i = 1; i < rowLength ; i++) {
      result.push([seq1Start + i, seq2Start, 2]);
    }
    return result;
  } else if ((rowLength === 2) && (columnLength === 2)) { //case 1
     //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //console.log('case 0');
    const scores = [0, gapPenalties, gapPenalties, 0];

    //fülle element
    const diagonalScore = (seq2[seq2End] === seq1[seq1End] ? matchScore : mismatchScore);
    const verticalScore = scores[2] + gapPenalties;
    const horizontalScore = scores[1] + gapPenalties;
    scores[3] = Math.max(diagonalScore, verticalScore, horizontalScore);

    if (scores[3] === diagonalScore) {
      return ( [[seq1End, seq2End, 0]] );
    } else if (scores[3] === verticalScore) {
      return ( [[seq1End, seq2End, 1], [seq1End, seq2Start, 2]] );
    } else {
      return ( [[seq1End, seq2End, 2], [seq1Start, seq2End, 1]] );
    }
  } else if (rowLength === 2) {
     //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //console.log('case 1');
    const scores = new Array(columnLength * 2).fill(0);
    const traceback = new Array(columnLength * 2);
    let result = [];

    //initialize Array
    for (let i = 0; i < columnLength; i++){
      scores[i] = i*gapPenalties;
      traceback[i] = 1;
    }
    scores[columnLength] = scores[columnLength] + gapPenalties;
    traceback[columnLength] = 2;

    //fülle rest auf
    for (let y = 1; y < columnLength; y++) {
      const diagonalScore = scores[y - 1] + (seq2[seq2Start + y - 1] === seq1[seq1End - 1] ? matchScore : mismatchScore);
      const verticalScore = scores[columnLength + y - 1] + gapPenalties;
      const horizontalScore = scores[y] + gapPenalties;
      scores[columnLength + y] = Math.max(diagonalScore, verticalScore, horizontalScore);

      if (scores[columnLength + y] === diagonalScore) {
        traceback[columnLength + y] = 0;
      } else if (scores[columnLength + y] === verticalScore) {
        traceback[columnLength + y] = 1;
      } else {
        traceback[columnLength + y] = 2;
      } 
    }
    
    //traceback
    let pos = traceback.length - 1;
    let posX = seq1End;
    let posY = seq2End;
    while (pos > 0) {
      if (traceback[pos] === 0) {
        result.push([posX, posY, 0]);
        pos -= columnLength + 1;
        posX--;
        posY--;
      } else if (traceback[pos] === 1) {
        result.push([posX, posY, 1]);
        pos -= 1;
        posY--;
      } else {
        result.push([posX, posY, 2]);
        pos -= columnLength;
        posX --;
      }
    }
    return result;
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  } else if (columnLength === 2) { //case 2
    //console.log('case 2');
    const scores = new Array(rowLength * 2).fill(0);
    const traceback = new Array(rowLength * 2);
    let result = [];

    //initialize Array
    for (let i = 0; i < rowLength; i++){
      scores[i] = i*gapPenalties;
      traceback[i] = 2;
    }
    scores[rowLength] = gapPenalties;
    traceback[rowLength] = 1;
    
    //fülle rest auf
    for (let x = 1; x < rowLength; x++) {
      const diagonalScore = scores[x - 1] + (seq2[seq2End - 1] === seq1[x - 1] ? matchScore : mismatchScore);
      const verticalScore = scores[x] + gapPenalties;
      const horizontalScore = scores[rowLength + x - 1] + gapPenalties;
      scores[rowLength + x] = Math.max(diagonalScore, verticalScore, horizontalScore);

      if (scores[rowLength + x] === diagonalScore) {
        traceback[rowLength + x] = 0;
      } else if (scores[rowLength + x] === verticalScore) {
        traceback[rowLength + x] = 1;
      } else {
        traceback[rowLength + x] = 2;
      } 
    }
    
    //traceback
    let pos = traceback.length - 1;
    let posX = seq1End;
    let posY = seq2End;
    while (pos > 0) {
      if (traceback[pos] === 0) {
        result.push([posX, posY, 0]);
        pos -= rowLength + 1;
        posX--;
        posY--;
      } else if (traceback[pos] === 1) {
        result.push([posX, posY, 1]);
        pos -= rowLength;
        posY--;
      } else {
        result.push([posX, posY, 2]);
        pos -= 1;
        posX --;
      }
    }
    return result;
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  } else {
    //console.log('case 3');
    //getMiddleCoordinates
    const m = Math.floor((seq1Start + seq1End) / 2);
    const scores = new Array(4 * columnLength).fill(0);

    //initialize Array
    for (let i = 0; i < columnLength; i++){
      scores[i] = i*gapPenalties;
      scores[i + 2 * columnLength] = i + seq2Start;
      scores[i + 3 * columnLength] = i + seq2Start;
    }

    //bis M
    for (let x = seq1Start; x < m; x++) {
      scores[columnLength] = scores[0] + gapPenalties;
      for (let y = 1; y < columnLength; y++) {
        const diagonalScore = scores[y - 1] + (seq2[seq2Start + y - 1] === seq1[x] ? matchScore : mismatchScore);
        const verticalScore = scores[columnLength + y - 1] + gapPenalties;
        const horizontalScore = scores[y] + gapPenalties;
        scores[columnLength + y] = Math.max(diagonalScore, verticalScore, horizontalScore);
      }
      for (let i = 0; i < columnLength; i++) {
        scores[i] = scores[columnLength + i];
      }
    }
    
    //ab M
    for (let x = m; x < seq1End; x++) {
      scores[columnLength] = scores[0] + gapPenalties;
      for (let y = 1; y < columnLength; y++) {
        const diagonalScore = scores[y - 1] + (seq2[seq2Start + y - 1] === seq1[x] ? matchScore : mismatchScore);
        const verticalScore = scores[columnLength + y - 1] + gapPenalties;
        const horizontalScore = scores[y] + gapPenalties;
        scores[columnLength + y] = Math.max(diagonalScore, verticalScore, horizontalScore);
        if (scores[columnLength + y] === diagonalScore) {
          scores[3 * columnLength + y] = scores[2 * columnLength + y - 1];
        } else if (scores[columnLength + y] === horizontalScore) {
          scores[3 * columnLength + y] = scores[2 * columnLength + y];
        } else if (scores[columnLength + y] === verticalScore) {
          scores[3 * columnLength + y] = scores[3 * columnLength + y - 1];
        }
      }
      for (let i = 0; i < columnLength; i++) {
        scores[i] = scores[columnLength + i];
        scores[2 * columnLength + i] = scores[3 * columnLength + i];
      }
    }
    
    return ([...getCoordinates(matchScore, mismatchScore, gapPenalties, seq1, seq2, seq1Start, m, seq2Start, scores[scores.length - 1]), ...getCoordinates(matchScore, mismatchScore, gapPenalties, seq1, seq2, m, seq1End, scores[scores.length - 1], seq2End)]);
  }
}

function getScoreLinear(matchScore, mismatchScore, gapPenalties, seq1, seq2) {
  const columnLength = seq2.length + 1;
  const scores = new Array(2 * columnLength).fill(0);

  //initialize Array
  for (let i = 0; i < columnLength; i++){
    scores[i] = i*gapPenalties;
  }

  for (let x = 1; x < seq1.length; x++) {
    scores[columnLength] = scores[0] + gapPenalties;
    for (let y = 1; y < columnLength; y++) {
      const diagonalScore = scores[y - 1] + (seq2[y - 1] === seq1[x] ? matchScore : mismatchScore);
      const verticalScore = scores[columnLength + y - 1] + gapPenalties;
      const horizontalScore = scores[y] + gapPenalties;
      scores[columnLength + y] = Math.max(diagonalScore, verticalScore, horizontalScore);
    }
    for (let i = 0; i < columnLength; i++) {
      scores[i] = scores[columnLength + i];
    }
    
  }
  return scores[scores.length - 1];
}