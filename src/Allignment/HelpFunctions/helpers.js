export function randomAASequence(n) {
    const aminoAcids = 'ACDEFGHIKLMNPQRSTVWY'; // list of all amino acids
    let result = '';
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * aminoAcids.length);
        result += aminoAcids[randomIndex];
    }
    return result;
}

export function randomDNASequence(n) {
    const nucleotides = ['A', 'C', 'G', 'T'];
    let result = '';
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * nucleotides.length);
      result += nucleotides[randomIndex];
    }
    return result;
}

export function getLevel(value, range) {
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