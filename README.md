# Alignment Website README

Welcome to the Alignment website, an interactive tool for analyzing and comparing DNA and amino acid sequences using various bioinformatics algorithms. Visit the website [here](https://allignment.netlify.app) or follow the instructions below to run it locally.

## Description
This platform allows users to input custom sequences and leverage different algorithms for detailed sequence alignment analysis, ideal for research and educational purposes.

### Sequence Inputs
Enter custom sequences at the top of the page. The site supports both DNA and amino acid sequences.

### Results ▲
- **Score**: Reflects sequence similarity. High scores indicate closer relations; low scores suggest distant relations.
- **Possible Alignments[^2seq]**: Number of alignments sharing the highest score.
- **Alignment**: Best possible alignment, with '-' indicating gap insertions.

### Options ☰
1. **Choose the Algorithm[^2seq]**
   - **a) Needleman-Wunsch**: Ideal for global alignment of sequences, using dynamic programming.
   - **b) Needleman-Wunsch with Linear Space**: Optimized for memory efficiency.
   - **c) Smith-Waterman**: Best for local alignment, identifying similar regions within sequences.
   - **d) Gotoh**: Incorporates affine gap penalties, favoring gap groups over multiple single gaps, ideal for complex alignments.

2. **Choose the Substitution Matrix**
   - **BLOSSUM**: Tailored substitution matrices for varying protein similarities. More information: [BLOSSUM Wikipedia](https://en.wikipedia.org/wiki/BLOSUM).
   - **Custom Matrix**: Define your own match, mismatch, and gap scores.

3. **Choose View[^2seq]**
   - Regular or minimalistic view options.

4. **Display All Results**
   - Show all high-scoring alignments.

5. **Scale**
   - Adjust the alignment matrix size.

6. **Random Sequences**
   - Generate completely random DNA or amino acid sequences to compare. The size of the sequences will fit the size of the screen. DNA^2 and AA^2 creates sequences of the same length.

7. **Change Mode**
   - Compare two or three sequences.

### Matrix Interpretation of Two Sequences
The alignment matrix is a crucial part of sequence alignment analysis. Each cell of the matrix represents a score, which is calculated based on the alignment of the sequence characters up to that point. The score takes into account matches, mismatches, and gaps. The path from the top left to the bottom right of the matrix that maximizes this score represents the optimal alignment.

## Run Website Locally
1. Install [Node.js](https://nodejs.org/en/download).
2. Clone the repository: `git clone https://github.com/leoxnard/Allignment.git`.
3. Navigate to the directory and install dependencies with `npm install`.
4. Launch the website with `npm start`, opening it in your browser.

[^2seq]: Only for two sequences
