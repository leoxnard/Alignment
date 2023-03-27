function randomAASequence(n) {
    const aminoAcids = 'ACDEFGHIKLMNPQRSTVWY'; // list of all amino acids
    let result = '';
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * aminoAcids.length);
        result += aminoAcids[randomIndex];
    }
    return result;
}

function randomDNASequence(n) {
    const nucleotides = ['A', 'C', 'G', 'T'];
    let result = '';
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * nucleotides.length);
      result += nucleotides[randomIndex];
    }
    return result;
}

export function randomSequence(dna, square, minimalistic, scale) { //all in bools
  const headlineSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--headline-size'));
  const squareSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--square-size')) - 0.5;
  const width = parseInt(window.innerWidth);
  const height = parseInt(window.innerHeight);
  let seq1Length;
  let seq2Length;
  seq1Length = Math.floor((width - 55) / (squareSize * scale)) - 1;
  seq2Length = Math.floor((height - headlineSize - 70) / (squareSize * scale)) - 1;
  if (!minimalistic) {
    seq1Length--;
    seq2Length--;
  }
  if (square) {
    const min = Math.min(seq1Length, seq2Length);
    seq1Length = min;
    seq2Length = min;
  }
  const randomSeqFunction = dna ? randomDNASequence : randomAASequence;
  return {seq1_: randomSeqFunction(seq1Length), seq2_: randomSeqFunction(seq2Length), showAllAllignments_: (seq1Length + seq2Length > 100) ? false : true};
}

function getLevel(value, range) {
    if (range === 0) {return ' level1Score';}
    if (value  === range) {
        return ' level10Score';
    }
    if (value  > range*9/10) {
        return ' level9Score';
    }
    if (value  > range*8/10) {
        return ' level8Score';
    }
    if (value  > range*7/10) {
        return ' level7Score';
    }
    if (value  > range*6/10) {
        return ' level6Score';
    }
    if (value  > range*5/10) {
        return ' level5Score';
    }
    if (value  > range*4/10) {
        return ' level4Score';
    }
    if (value  > range*3/10) {
        return ' level3Score';
    }
    if (value  > range*2/10) {
        return ' level2Score';
    }
    return ' level1Score';
}

export function getScoreLevel(i, scoreMatrix, minScore, maxScores) {
  const range = scoreMatrix[maxScores[0]] - scoreMatrix[minScore];
  const value = scoreMatrix[i] - scoreMatrix[minScore];
  return getLevel(value, range);
}