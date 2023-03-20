import { getTraceArray, getAllAllignments, getAllignment } from "../HelpFunctions/AlgorithmHelpers";

export function Gotoh(seq1, seq2, matchScore, mismatchScore, gapScore, extensionScore, showAllAllignments) {
  const seq1Length = seq1.length;
  const seq2Length = seq2.length;
  let maxScores = [seq1Length + 3];
  let minScore = seq1Length + 3;
  const matricesLength = (seq1Length + 2) * (seq2Length + 2);
  const scores = new Array(matricesLength).fill(0);
  const traceback = new Array(matricesLength).fill([0]);
  const m_matrix = new Array(matricesLength * 2).fill(-Infinity, 0, matricesLength).fill(0, matricesLength, matricesLength * 2);
  const ix_matrix = new Array(matricesLength * 2).fill(-Infinity, 0, matricesLength).fill(0, matricesLength, matricesLength * 2);
  const iy_matrix = new Array(matricesLength * 2).fill(-Infinity, 0, matricesLength).fill(0, matricesLength, matricesLength * 2);
  // const m_traceback = new Array(matricesLength).fill(0);
  // const ix_traceback = new Array(matricesLength).fill(0);
  // const iy_traceback = new Array(matricesLength).fill(0);

  m_matrix[seq1Length + 3] = 0;

  //first rows
  for (let i = 1; i <= seq1Length; i++){
    ix_matrix[seq1Length + 3 + i] = gapScore + (i - 1) * extensionScore;
    ix_matrix[matricesLength + seq1Length + 3 + i] = 2;
    scores[seq1Length + 3 + i] = gapScore + (i - 1) * extensionScore;
    if (i === 1) {
      ix_matrix[matricesLength + seq1Length + 4] = 1;
    }
  }
  
  //first columns
  for (let j=1; j <= seq2Length; j++){
    iy_matrix[(seq1Length + 2) * (j + 1) + 1] = gapScore + (j - 1) * extensionScore;
    iy_matrix[matricesLength + ((seq1Length + 2) * (j + 1)) + 1] = 3;
    scores[(seq1Length + 2) * (j + 1) + 1] = gapScore + (j - 1) * extensionScore;
    if (j === 1) {
      iy_matrix[matricesLength + seq1Length + 4] = 1;
    }
  }

  let score1, score2, score3, addScore;

  //rekursion
  for (let pos = (seq1Length + 3) * 2; pos <= matricesLength; pos++){
    if (!( pos % (seq1Length+2) < 2 )){
      addScore = seq1[pos % (seq1Length+2) - 2] === seq2[Math.floor(pos / (seq1Length + 2)) - 2] ? matchScore : mismatchScore

      score1 = m_matrix[(pos - (seq1Length + 3))] + addScore;
      score2 = ix_matrix[(pos - (seq1Length + 3))] + addScore;
      score3 = iy_matrix[(pos - (seq1Length + 3))] + addScore;
      m_matrix[pos] = Math.max(score1, score2, score3);
      if (m_matrix[pos] === score1) {
        m_matrix[matricesLength + pos] = 1; // d1
      }
      if (m_matrix[pos] === score2) {
        if (m_matrix[matricesLength + pos] === 0) {
          m_matrix[matricesLength + pos] = 2; // d2
        } else {
          m_matrix[matricesLength + pos] = 4; // d12
        }
      }
      if (m_matrix[pos] === score3) {
        if (m_matrix[matricesLength + pos] === 0) {
          m_matrix[matricesLength + pos] = 3; // d3
        } else if (m_matrix[matricesLength + pos] === 1) {
          m_matrix[matricesLength + pos] = 5; // d13
        } else if (m_matrix[matricesLength + pos] === 2) {
          m_matrix[matricesLength + pos] = 6; // d23
        } else {
          m_matrix[matricesLength + pos] = 7; // d123
        }
      }

      score1 = m_matrix[pos - 1] + gapScore;
      score2 = ix_matrix[pos - 1] + extensionScore;
      ix_matrix[pos] = Math.max(score1, score2);
      if (ix_matrix[pos] === score1) {
        ix_matrix[matricesLength + pos] = 1; // v1
      }
      if (ix_matrix[pos] === score2) {
        if (ix_matrix[matricesLength + pos] === 0) {
          ix_matrix[matricesLength + pos] = 2; // v2
        } else {
          ix_matrix[matricesLength + pos] = 3; // v12
        }
      }

      score1 = m_matrix[pos - (seq1Length + 2)] + gapScore;
      score2 = iy_matrix[pos - (seq1Length + 2)] + extensionScore;
      iy_matrix[pos] = Math.max(score1, score2);
      if (iy_matrix[pos] === score1) {
        iy_matrix[matricesLength + pos] = 1; // h1
      }
      if (iy_matrix[pos] === score2) {
        if (iy_matrix[matricesLength + pos] === 0) {
          iy_matrix[matricesLength + pos] = 2; // h2
        } else {
          iy_matrix[matricesLength + pos] = 3; // h12
        }
      }

      // scores[pos] = Math.max(m_matrix[pos], ix_matrix[pos], iy_matrix[pos]);
      // if (scores[pos] === m_matrix[pos]) {
      //   traceback[pos] = [1, m_matrix[matricesLength + pos] ]; // d
      // }
      // if (scores[pos] ===  iy_matrix[pos]) {
      //   if (traceback[pos] === 0) {
      //     traceback[pos] = [2, iy_matrix[matricesLength + pos] ]; // v
      //   } else {
      //     traceback[pos] = [4, traceback[pos][1], iy_matrix[matricesLength + pos] ]; // dv
      //   }
      // }
      // if (scores[pos] === ix_matrix[pos]) {
      //   if (traceback[pos] === 0) {
      //     traceback[pos] = [3, ix_matrix[matricesLength + pos] ]; // h
      //   } else if (traceback[pos] === 1) {
      //     traceback[pos] = [5, traceback[pos][1], ix_matrix[matricesLength + pos] ]; // dh
      //   } else if (traceback[pos] === 2) {
      //     traceback[pos] = [6, traceback[pos][1], ix_matrix[matricesLength + pos] ]; // vh
      //   } else {
      //     traceback[pos] = [7, traceback[pos][1], traceback[pos][2], ix_matrix[matricesLength + pos] ]; // vdh
      //   }
      // }
      
    }
  }
  console.table(m_matrix)   
  console.table(ix_matrix)   
  console.table(iy_matrix)   

  // if (scores[pos] > scores[maxScores[0]]) {
  //   maxScores = [pos];
  // } else if (scores[pos] === scores[maxScores[0]]) {
  //   maxScores.push(pos);
  // } else if (scores[pos] < scores[minScore]) {
  //   minScore = pos;
  // }

  const array = getTraceArray(traceback, seq1Length, [matricesLength - 1]);
  let allignments;
  if (showAllAllignments) {
    allignments = getAllAllignments(array, seq1, seq2, matricesLength - 1, seq1Length - 1, seq2Length - 1);
  } else {
    allignments = getAllignment(array, seq1, seq2, matricesLength - 1, seq1Length - 1, seq2Length - 1);
  }
  allignments = allignments.map(subArray => subArray.map(str => str.split('').reverse().join('')));
  //console.table(array)
  //console.table(scores)
  return([scores, minScore, maxScores, array, allignments, scores[matricesLength - 1]]);
}