import { getAllAllignments, getAllignment } from "../HelpFunctions/AlgorithmHelpers";
import { substitutionsMatrixScore } from "./Substitutionsmatrices";

export function NeedlemanWunschLinear(seq1, seq2, matchScore, mismatchScore, gapScore, substitutionsMatrix, showAllAllignments) {
  if (seq1.length === 0 && seq2.length === 0) { return([['','','',''], 3, [3], [0,0,0,0]]);}
  const matrixLength = (seq1.length + 2) * (seq2.length + 2);
  const coordinates = [[0, 0, 3], ...getCoordinates(matchScore, mismatchScore, gapScore, substitutionsMatrix, seq1, seq2, 0, seq1.length, 0, seq2.length)];
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
  return ([ new Array(matrixLength).fill(''), 3, [3], tracebackMatrix, allignmentsRev, getScoreLinear(matchScore, mismatchScore, gapScore, substitutionsMatrix, seq1, seq2) ]);
}

function getCoordinates(matchScore, mismatchScore, gapScore, substitutionsMatrix, seq1, seq2, seq1Start, seq1End, seq2Start, seq2End) {
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
    const scores = [0, gapScore, gapScore, 0];
    
    //fülle element
    const diagonalScore = substitutionsMatrixScore(substitutionsMatrix, seq1[seq1End], seq2[seq2End], matchScore, mismatchScore);
    const verticalScore = scores[2] + gapScore;
    const horizontalScore = scores[1] + gapScore;
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
      scores[i] = i*gapScore;
      traceback[i] = 1;
    }
    scores[columnLength] = scores[columnLength] + gapScore;
    traceback[columnLength] = 2;
    
    //fülle rest auf
    for (let y = 1; y < columnLength; y++) {
      const diagonalScore = scores[y - 1] + substitutionsMatrixScore(substitutionsMatrix, seq1[seq1End - 1], seq2[seq2Start + y - 1], matchScore, mismatchScore);
      const verticalScore = scores[columnLength + y - 1] + gapScore;
      const horizontalScore = scores[y] + gapScore;
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
      scores[i] = i*gapScore;
      traceback[i] = 2;
    }
    scores[rowLength] = gapScore;
    traceback[rowLength] = 1;
    
    //fülle rest auf
    for (let x = 1; x < rowLength; x++) {
      const diagonalScore = scores[x - 1] + substitutionsMatrixScore(substitutionsMatrix, seq1[x - 1], seq2[seq2End - 1], matchScore, mismatchScore);
      const verticalScore = scores[x] + gapScore;
      const horizontalScore = scores[rowLength + x - 1] + gapScore;
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
      scores[i] = i*gapScore;
      scores[i + 2 * columnLength] = i + seq2Start;
      scores[i + 3 * columnLength] = i + seq2Start;
    }
    
    //bis M
    for (let x = seq1Start; x < m; x++) {
      scores[columnLength] = scores[0] + gapScore;
      for (let y = 1; y < columnLength; y++) {
        const diagonalScore = scores[y - 1] + substitutionsMatrixScore(substitutionsMatrix, seq1[x], seq2[seq2Start + y - 1], matchScore, mismatchScore);
        const verticalScore = scores[columnLength + y - 1] + gapScore;
        const horizontalScore = scores[y] + gapScore;
        scores[columnLength + y] = Math.max(diagonalScore, verticalScore, horizontalScore);
      }
      for (let i = 0; i < columnLength; i++) {
        scores[i] = scores[columnLength + i];
      }
    }
    
    //ab M
    for (let x = m; x < seq1End; x++) {
      scores[columnLength] = scores[0] + gapScore;
      for (let y = 1; y < columnLength; y++) {
        const diagonalScore = scores[y - 1] + substitutionsMatrixScore(substitutionsMatrix, seq1[x], seq2[seq2Start + y - 1], matchScore, mismatchScore);
        const verticalScore = scores[columnLength + y - 1] + gapScore;
        const horizontalScore = scores[y] + gapScore;
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
    console.log(scores[scores.length - 1])
    return ([...getCoordinates(matchScore, mismatchScore, gapScore, substitutionsMatrix, seq1, seq2, seq1Start, m, seq2Start, scores[scores.length - 1]), ...getCoordinates(matchScore, mismatchScore, gapScore, substitutionsMatrix, seq1, seq2, m, seq1End, scores[scores.length - 1], seq2End)]);
  }
}

function getScoreLinear(matchScore, mismatchScore, gapScore, substitutionsMatrix, seq1, seq2) {
  //console.log('getScoreLinear')
  const columnLength = seq2.length + 1;
  const scores = new Array(2 * columnLength).fill(0);

  //initialize Array
  for (let i = 0; i < columnLength; i++){
    scores[i] = i*gapScore;
  }

  for (let x = 1; x < seq1.length; x++) {
    scores[columnLength] = scores[0] + gapScore;
    for (let y = 1; y < columnLength; y++) {
      const diagonalScore = scores[y - 1] + substitutionsMatrixScore(substitutionsMatrix, seq1[x], seq2[y - 1], matchScore, mismatchScore);
      const verticalScore = scores[columnLength + y - 1] + gapScore;
      const horizontalScore = scores[y] + gapScore;
      scores[columnLength + y] = Math.max(diagonalScore, verticalScore, horizontalScore);
    }
    for (let i = 0; i < columnLength; i++) {
      scores[i] = scores[columnLength + i];
    }
    
  }
  return scores[scores.length - 1];
}