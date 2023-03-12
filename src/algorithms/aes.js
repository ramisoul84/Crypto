/* - - - - - - - - - - - - - - - - - - - - - - - */
/*                   AES Crypto                  */
/* - - - - - - - - - - - - - - - - - - - - - - - */

import {
  txtToBin,
  xor,
  xorMat,
  vectorToMatrix,
  matrixToVector,
  wordToBytes,
  messageToBlocks,
} from "./general.js";

// Rijndael S-box
const sBox = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe,
  0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4,
  0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7,
  0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3,
  0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09,
  0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3,
  0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe,
  0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
  0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92,
  0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c,
  0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19,
  0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14,
  0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2,
  0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5,
  0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25,
  0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86,
  0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e,
  0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42,
  0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
];
// The round constant word array..
const rCon = [
  [0x01, 0x00, 0x00, 0x00],
  [0x02, 0x00, 0x00, 0x00],
  [0x04, 0x00, 0x00, 0x00],
  [0x08, 0x00, 0x00, 0x00],
  [0x10, 0x00, 0x00, 0x00],
  [0x20, 0x00, 0x00, 0x00],
  [0x40, 0x00, 0x00, 0x00],
  [0x80, 0x00, 0x00, 0x00],
  [0x1b, 0x00, 0x00, 0x00],
  [0x36, 0x00, 0x00, 0x00],
];

// shift a word's bytes   n steps left ...
const rotWord = (word, n) => {
  const bytes = wordToBytes(word);
  let temp;
  for (let i = 0; i < n; i++) {
    temp = bytes[0];
    for (let j = 1; j < 4; j++) {
      bytes[j - 1] = bytes[j];
    }
    bytes[3] = temp;
  }
  return bytes.join("");
};

// Byte Substitution (S-Box):
const subByte = (byte) => {
  const l = parseInt(byte.substring(0, 4), 2);
  const r = parseInt(byte.substring(4, 8), 2);
  return sBox[l * 16 + r].toString(2).padStart(8, "0");
};

// Substitution each byte in word (S-Box):
const subWord = (word) => {
  const bytes = wordToBytes(word);
  for (let i = 0; i < 4; i++) {
    bytes[i] = subByte(bytes[i]);
  }
  return bytes.join("");
};

//substitute each  (byte) of  state matrix by corresponding byte in AES S-Box
const subMatrix = (mat) => {
  let newMat = [];
  for (let i = 0; i < 4; i++) {
    newMat[i] = [];
    for (let j = 0; j < 4; j++) {
      newMat[i][j] = subByte(mat[i][j]);
    }
  }
  return newMat;
};

// Adding round constant
const roundConst = (word, rc) => {
  const bytes = wordToBytes(word);
  for (let i = 0; i < 4; i++) {
    bytes[i] = xor(bytes[i], rc[i].toString(2).padStart(8, "0"));
  }
  return bytes.join("");
};

// ShiftRows in Matrix
const shiftRows = (mat) => {
  let newMatrix = [];
  for (let i = 0; i < 4; i++) {
    newMatrix.push(wordToBytes(rotWord(mat[i].join(""), i)));
  }
  return newMatrix;
};

//  Muliplication {a}•{bin} in GF(2^8)
const dot = (a, bin) => {
  let res = "";
  if (a === 1) {
    res = bin;
  } else if (a === 2) {
    for (let i = 0; i < 8; i++) {
      res += bin[i];
    }
    res += "0";
    if (res[0] === "0") res = res.substring(1, 9);
    else {
      res = res.padStart(16, "0");
      res = xor(res, "0000000100011011");
      res = res.substring(8, 16);
    }
  } else {
    res = dot(2, bin);
    res = xor(bin, res);
  }
  return res;
};

// MixColumns
const mixColumns = (B) => {
  const A = [
    [2, 3, 1, 1],
    [1, 2, 3, 1],
    [1, 1, 2, 3],
    [3, 1, 1, 2],
  ];
  const C = [];
  for (let i = 0; i < 4; i++) {
    C[i] = [];
    for (let j = 0; j < 4; j++) {
      C[i][j] = xor(
        xor(dot(A[i][0], B[0][j]), dot(A[i][1], B[1][j])),
        xor(dot(A[i][2], B[2][j]), dot(A[i][3], B[3][j]))
      );
    }
  }
  return C;
};

// AES Key Expansion (schedule) to Create all Round Keys..
const keyExpansion = (keyBin) => {
  const nK = keyBin.length / 32;
  const nR = nK + 6; // Number of Rounds
  // split the original key to (32-bit) words and then create round key words ..
  const roundKeysWords = [];
  for (let i = 0; i < 4 * (nR + 1); i++) {
    if (i < nK) {
      roundKeysWords.push(keyBin.substring(i * 32, i * 32 + 32));
    } else if (i >= nK && i % nK === 0) {
      roundKeysWords.push(
        xor(
          roundConst(
            subWord(rotWord(roundKeysWords[i - 1], 1)),
            rCon[i / nK - 1]
          ),
          roundKeysWords[i - nK]
        )
      );
    } else if (nK > 6 && i >= nK && i % nK === 4) {
      roundKeysWords.push(
        xor(subWord(roundKeysWords[i - 1]), roundKeysWords[i - nK])
      );
    } else {
      roundKeysWords.push(xor(roundKeysWords[i - 1], roundKeysWords[i - nK]));
    }
  }
  // Array of Round Keys
  const roundKeys = [];
  for (let i = 0; i <= nR; i++) {
    roundKeys.push(roundKeysWords.slice(i * 4, i * 4 + 4).join(""));
  }
  // Table used to explain all operation through Key Expansion
  const table = [];
  for (let i = 0; i < nK; i++) {
    table[i] = [];
    for (let j = 0; j < 6; j++) {
      if (j !== 5) {
        table[i].push("");
      } else {
        table[i].push(roundKeysWords[i]);
      }
    }
  }
  for (let i = nK; i < 4 * (nR + 1); i++) {
    table[i] = [];
    table[i].push(roundKeysWords[i - 1]);
    table[i].push(i % nK === 0 ? rotWord(roundKeysWords[i - 1], 1) : "");
    table[i].push(
      i % nK === 0
        ? subWord(rotWord(roundKeysWords[i - 1], 1))
        : nK > 6 && i % nK === 4
        ? subWord(roundKeysWords[i - 1])
        : ""
    );
    table[i].push(
      i % nK === 0
        ? roundConst(
            subWord(rotWord(roundKeysWords[i - 1], 1)),
            rCon[i / nK - 1]
          )
        : ""
    );
    table[i].push(roundKeysWords[i - nK]);
    table[i].push(roundKeysWords[i]);
  }
  return {
    roundKeysWords: roundKeysWords,
    roundKeys: roundKeys,
    table: table,
  };
};

// Encrypt one block
const encryptBlock = (plainTextBin, keyBin) => {
  const nK = keyBin.length / 32;
  const nR = nK + 6;
  const roundKeys = keyExpansion(keyBin).roundKeys;
  let stateMatrix = [];
  stateMatrix.push(
    xorMat(vectorToMatrix(plainTextBin), vectorToMatrix(roundKeys[0]))
  );
  for (let i = 1; i < nR; i++) {
    stateMatrix.push(
      xorMat(
        mixColumns(shiftRows(subMatrix(stateMatrix[i - 1]))),
        vectorToMatrix(roundKeys[i])
      )
    );
  }
  stateMatrix.push(
    xorMat(
      shiftRows(subMatrix(stateMatrix[nR - 1])),
      vectorToMatrix(roundKeys[nR])
    )
  );
  const states = stateMatrix.map((e) => {
    return matrixToVector(e);
  });
  return states[nR];
};

// Main AES method to encrypt a message (binary)
const encrypt = (plainTextBin, keyBin) => {
  const nK = keyBin.length / 32; // Number of (32-bit) words in Key -> 4/6/8 for 128/192/256-bit keys..
  const nR = nK + 6; // Number of rounds -> 10/12/14 for 128/192/256-bit keys..
  const blockSize = 128;
  const addedDigits = messageToBlocks(plainTextBin, blockSize).addedDigits;
  const numberOfBlocks = messageToBlocks(
    plainTextBin,
    blockSize
  ).numberOfBlocks;
  const plainTextBinBlocks = messageToBlocks(
    plainTextBin,
    blockSize
  ).plainTextBinBlocks;
  const roundKeysWords = keyExpansion(keyBin).roundKeysWords;
  const roundKeys = keyExpansion(keyBin).roundKeys;
  const table = keyExpansion(keyBin).table;
  //
  const cipherTextBinBlocks = [];
  for (let i = 0; i < numberOfBlocks; i++) {
    cipherTextBinBlocks.push(encryptBlock(plainTextBinBlocks[i], keyBin));
  }
  const cipherTextBin = cipherTextBinBlocks.join("");
  return {
    nK: nK,

    numberOfBlocks: numberOfBlocks,
    cipherTextBin: cipherTextBin,
    roundKeysWords: roundKeysWords,
    roundKeys: roundKeys,
    table: table,
  };
};

export { encrypt };

//
const plainText = txtToBin("Two One Nine Two....");
const key = txtToBin("Thats my Kung Fu");

encrypt(plainText, key);
console.log(key);
console.log(encrypt(plainText, key).numberOfBlocks);
console.log(encrypt(plainText, key).cipherTextBin);
console.log(encrypt(plainText, key).table);
