/* - - - - - - - - - - - - - - - - - - - - - - - */
/*  General Methods used in AES, DES Encryption  */
/* - - - - - - - - - - - - - - - - - - - - - - - */

// Text to Binary Converter :  char -> (8-bit)
const txtToBin = (txt) => {
  return txt
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    })
    .join("");
};

// Hex to Binary converter :  char -> (4-bit)
const hexToBin = (hex) => {
  return hex
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");
};

// XORing two Binary numbers bin1,bin2 : (same length)
const xor = (bin1, bin2) => {
  let res = "";
  for (let i = 0; i < bin1.length; i++) {
    if (bin1[i] === bin2[i]) {
      res += "0";
    } else {
      res += "1";
    }
  }
  return res;
};

// XORing bytes (cells) of two (4x4) Matrixs
const xorMat = (matA, matB) => {
  let newMat = [];
  for (let i = 0; i < 4; i++) {
    newMat[i] = [];
    for (let j = 0; j < 4; j++) {
      newMat[i][j] = xor(matA[i][j], matB[i][j]);
    }
  }
  return newMat;
};

// Convert a 128-bits binary vector to Matrix 4*4 (binary)
const vectorToMatrix = (bin) => {
  let matrix = [];
  let arr = []; // Array of Bytes...
  for (let i = 0; i < bin.length / 8; i++) {
    arr.push(bin.substring(i * 8, i * 8 + 8));
  }
  for (let i = 0; i < 4; i++) {
    matrix[i] = [];
    for (let j = 0; j < 4; j++) {
      matrix[i][j] = arr[j * 4 + i];
    }
  }
  return matrix;
};

// Convert a 4x4 Matrix to 128-bit vector
const matrixToVector = (mat) => {
  let vec = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      vec += mat[i][j];
    }
  }
  return vec;
};

// Split a (32-bits) word to 4 parts(bytes) (8-bit) each
const wordToBytes = (word) => {
  const bytes = [];
  for (let i = 0; i < 4; i++) {
    bytes.push(word.substring(i * 8, i * 8 + 8));
  }
  return bytes;
};

// Split plainText into blocks (blockSize) each.
const messageToBlocks = (plainTextBin, blockSize) => {
  let addedDigits = 0;
  // add some zeros to make last block (blockSize)
  while (plainTextBin.length % blockSize !== 0) {
    plainTextBin += "0";
    addedDigits++;
  }
  // calculate the number of blocks in the message
  const numberOfBlocks =
    plainTextBin.length % blockSize === 0
      ? ~~(plainTextBin.length / blockSize)
      : ~~(1 + plainTextBin.length / blockSize);
  // Array of blocks
  const plainTextBinBlocks = [];
  for (let i = 0; i < numberOfBlocks; i++) {
    plainTextBinBlocks.push(
      plainTextBin.substring(i * blockSize, i * blockSize + blockSize)
    );
  }
  return {
    addedDigits: addedDigits,
    numberOfBlocks: numberOfBlocks,
    plainTextBinBlocks: plainTextBinBlocks,
  };
};

// method to show vector of binary(n*8-bit) numbers in Hex format with space
const showHexFormat = (bin) => {
  let hex = [];
  for (let i = 0; i < bin.length / 8; i++) {
    hex.push(
      parseInt(bin.substring(i * 8, i * 8 + 8), 2)
        .toString(16)
        .toUpperCase()
    );
  }
  return hex.join(" ");
};

// 4x4 binary -> 4x4 matrix in Hex
const matHex = (mat) => {
  let newMat = [];
  for (let i = 0; i < 4; i++) {
    newMat[i] = [];
    for (let j = 0; j < 4; j++) {
      newMat[i][j] = showHexFormat(mat[i][j]);
    }
  }
  return newMat;
};

export {
  txtToBin,
  hexToBin,
  xor,
  xorMat,
  vectorToMatrix,
  matrixToVector,
  wordToBytes,
  messageToBlocks,
  showHexFormat,
  matHex,
};
