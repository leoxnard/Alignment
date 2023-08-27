function randomAASequence(n) {
    const aminoAcids = 'ACDEFGHIKLMNPQRSTVWY';
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

export function randomSequenceMSA(mode, size) {
  const randomSeqFunction = mode ? randomDNASequence : randomAASequence;
  return {seq1_: randomSeqFunction(size), seq2_: randomSeqFunction(size), seq3_: randomSeqFunction(size)};
}