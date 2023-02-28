// Declaring Permutation Tables .....
const PC1 = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];
const PC2 = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];
const shiftSteps = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
const IP = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];
const E = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];
const S = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],
  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],
  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ],
  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ],
  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ],
  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ],
  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ],
  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ],
];
const P = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];
const IP_1 = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];

// a method to convert any  String to Binary(8 bits) each char
const strToBin = (str) => {
  return str
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    })
    .join("");
};

// a method to convert any Binary to Decimal
const binToDec = (bin) => {
  return parseInt(bin, 2);
};

// a method to convert a binary to hexadecimal  !!!!!!!!!!!!!
const binToHex = (bin) => {
  let hex = "";
  for (let i = 0; i < bin.length / 4; i++) {
    hex += parseInt(bin.substring(i * 4, i * 4 + 4), 2)
      .toString(16)
      .toUpperCase();
  }
  return hex;
};

// a method to convert any hexadecimal to binary
const hexToBin = (hex) => {
  return hex
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");
};

// A Permutation method
const permute = (bin, arr) => {
  let per = [];
  for (let i = 0; i < arr.length; i++) {
    per.push(bin[arr[i] - 1]);
  }
  return per.join("");
};

// Shiftting method
const shift = (bin, step) => {
  let s = [];
  for (let i = 0; i < step; i++) {
    for (let j = 1; j < bin.length; j++) {
      s.push(bin[j]);
    }
    s.push(bin[0]);
    bin = s.join("");
    s = [];
  }
  return bin;
};

// A method to Create 16 subkeys
const subKeysCreate = (keyBin) => {
  const key56 = permute(keyBin, PC1);
  const keys48 = [];
  let l = key56.substring(0, 28);
  let r = key56.substring(28, 56);
  const key56Halves = [];
  for (let i = 0; i < 16; i++) {
    l = shift(l, shiftSteps[i]);
    r = shift(r, shiftSteps[i]);
    key56Halves.push(l + r);
    keys48.push(permute(l + r, PC2));
  }
  return [key56, key56Halves, keys48];
};

// a method to Calculate number of blocks - 64 bits each
const numberOfBlocksCalc = (plainTextBin) => {
  return plainTextBin.length % 64 === 0
    ? ~~(plainTextBin.length / 64)
    : ~~(1 + plainTextBin.length / 64);
};

// a method to Split plainText to /64 bits/ Blocks
const splitText = (plainTextBin) => {
  let addedDigits = 0;
  while (plainTextBin.length % 64 !== 0) {
    plainTextBin += "0";
    addedDigits++;
  }
  let nob = numberOfBlocksCalc(plainTextBin);
  const plainTextBinBlocks = [];
  for (let i = 0; i < nob; i++) {
    plainTextBinBlocks.push(plainTextBin.substring(i * 64, i * 64 + 64));
  }
  return [plainTextBinBlocks, addedDigits];
};

// Xoring method
const xor = (a, b) => {
  let res = "";
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      res += "0";
    } else {
      res += "1";
    }
  }
  return res;
};

//a method to convert decimal to binary used in f function
const decToBinf = (dec) => {
  return dec.toString(2).padStart(4, "0");
};

// F Function
const f = (bin) => {
  let res = "";
  const B = [];
  for (let i = 0; i < 8; i++) {
    B.push(bin.substring(i * 6, i * 6 + 6));
  }
  for (let i = 0; i < 8; i++) {
    let row = binToDec(B[i].substring(0, 1) + B[i].substring(5, 6));
    let col = binToDec(B[i].substring(1, 5));
    res += decToBinf(S[i][row][col]);
  }
  res = permute(res, P);
  return res;
};
// Encrypt a block of plain text
const encryptBlock = (plainTextBin, keys48) => {
  let textIP = permute(plainTextBin, IP);
  let L = textIP.substring(0, 32);
  let R = textIP.substring(32, 64);
  for (let i = 0; i < 16; i++) {
    let temp = L;
    L = R;
    R = xor(f(xor(permute(R, E), keys48[i])), temp);
  }
  let res = R + L;
  res = permute(res, IP_1);
  return res;
};

// main method to encrypt the whole text
const encrypt = (plainTextBin, keyBin) => {
  const numberOfBlocks = numberOfBlocksCalc(plainTextBin);
  const plainTextBinBlocks = splitText(plainTextBin)[0];
  const addeddigits = splitText(plainTextBin)[1];
  const key56 = subKeysCreate(keyBin)[0];
  const key56Halves = subKeysCreate(keyBin)[1];
  const keys48 = subKeysCreate(keyBin)[2];
  let textIP = permute(plainTextBinBlocks[0], IP);
  const cipherTextBinBlocks = [];
  for (let i = 0; i < numberOfBlocks; i++) {
    cipherTextBinBlocks.push(encryptBlock(plainTextBinBlocks[i], keys48));
  }
  const cipherTextBin = cipherTextBinBlocks.join("");
  const cipherTextHex = binToHex(cipherTextBin);
  return {
    PC1: PC1,
    PC2: PC2,
    shiftSteps: shiftSteps,
    IP: IP,
    E: E,
    numberOfBlocks: numberOfBlocks,
    plainTextBinBlocks: plainTextBinBlocks,
    keyBin: keyBin,
    key56: key56,
    key56Halves: key56Halves,
    keys48: keys48,
    textIP: textIP,
    cipherTextBinBlocks: cipherTextBinBlocks,
    cipherTextHex: cipherTextHex,
  };
};
export { strToBin, hexToBin, encrypt };
