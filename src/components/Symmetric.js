import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as DesAlgorithm from "../algorithms/des";
import * as AesAlgorithm from "../algorithms/aes";
import { showHexFormat } from "../algorithms/general";
import { MdOutlineDoubleArrow } from "react-icons/md";
import "./symmetric.css";
const Symmetric = () => {
  const [data, setData] = useState({
    algo: "",
    mode: "",
    plainText: "",
    key: "",
    keyRadio: "str",
  });
  const [keyLength, setKeyLength] = useState(0);
  const keyLenCalc = () => {
    if (data.algo === "des" && data.keyRadio === "str") {
      setKeyLength(8);
    } else if (data.algo === "des" && data.keyRadio === "hex") {
      setKeyLength(16);
    } else if (data.algo === "aes128" && data.keyRadio === "str") {
      setKeyLength(16);
    } else if (data.algo === "aes128" && data.keyRadio === "hex") {
      setKeyLength(32);
    } else if (data.algo === "aes192" && data.keyRadio === "str") {
      setKeyLength(24);
    } else if (data.algo === "aes192" && data.keyRadio === "hex") {
      setKeyLength(48);
    } else if (data.algo === "aes256" && data.keyRadio === "str") {
      setKeyLength(32);
    } else if (data.algo === "aes256" && data.keyRadio === "hex") {
      setKeyLength(64);
    } else setKeyLength(0);
  };
  const validateForm = () => {
    const button = document.getElementById("submit");
    const keyGen = document.getElementById("key-gen");
    const key = document.getElementById("key");
    const algo = document.getElementById("algo");
    const mode = document.getElementById("mode");
    const pt = document.getElementById("plainText");
    if (
      key.checkValidity() &&
      algo.checkValidity() &&
      mode.checkValidity() &&
      pt.checkValidity()
    ) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
    if (algo.checkValidity()) {
      keyGen.disabled = false;
    } else {
      keyGen.disabled = true;
    }
  };
  useEffect(keyLenCalc, [data.algo, data.keyRadio]);
  useEffect(validateForm, [
    data.algo,
    data.keyRadio,
    data.key,
    data.mode,
    data.plainText,
  ]);
  const [result, setResult] = useState({
    numberOfBlocks: 0,
    plainTextBinBlocks: [],
    addedDigets: 0,
    cipherTextBin: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const showAlert = () => {
    const charactersStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersHex = "0123456789ABCDEF";

    let key = "";
    const len =
      data.keyRadio === "str" ? charactersStr.length : charactersHex.length;
    const chars = data.keyRadio === "str" ? charactersStr : charactersHex;
    for (let i = 0; i < keyLength; i++) {
      key += chars.charAt(Math.floor(Math.random() * len));
    }
    setData((prev) => {
      return {
        ...prev,
        key: key,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const plainTextBin = DesAlgorithm.strToBin(data.plainText);
    const keyBin =
      data.keyRadio === "str"
        ? DesAlgorithm.strToBin(data.key)
        : DesAlgorithm.hexToBin(data.key);
    const { numberOfBlocks, plainTextBinBlocks, cipherTextBin } =
      data.algo === "des"
        ? DesAlgorithm.encrypt(plainTextBin, keyBin)
        : AesAlgorithm.encrypt(plainTextBin, keyBin);

    setResult((prev) => {
      return {
        ...prev,
        numberOfBlocks: numberOfBlocks,
        plainTextBinBlocks: plainTextBinBlocks,
        keyBin: keyBin,
        cipherTextBin: cipherTextBin,
      };
    });
    const res = document.getElementById("result-cipher");
    res.style.display = "block";
  };

  return (
    <section id="symmetric">
      <div>
        <form onSubmit={handleSubmit}>
          {/* SELECT */}
          <label htmlFor="algo">Algorithm</label>
          <select id="algo" name="algo" onChange={handleChange} required>
            <option value="">--Choose an algorithm--</option>
            <option value="des">DES</option>
            <option value="des3">3DES</option>
            <option value="aes128">AES-128</option>
            <option value="aes192">AES-192</option>
            <option value="aes256">AES-256</option>
          </select>
          <label htmlFor="mode">Mode</label>
          <select id="mode" name="mode" onChange={handleChange} required>
            <option value="">--Choose a mode--</option>
            <option value="ecb">ECB</option>
            <option value="cbc">CBC</option>
            <option value="cfb">CFB</option>
            <option value="ofb">OFB</option>
            <option value="ctr">CTR</option>
          </select>
          {/* KEY */}
          <label htmlFor="key">
            Key
            <span>({data.keyRadio === "str" ? "String" : "Hexadecimal "})</span>
            <span className="alert">
              {data.key.length - keyLength === 0
                ? ""
                : `(${data.key.length - keyLength})`}
            </span>
          </label>
          <div className="key-gen">
            <input
              type="text"
              name="key"
              id="key"
              placeholder={
                data.algo === "des"
                  ? data.keyRadio === "str"
                    ? "Enter a (64-bits) string key - 8  characters"
                    : "Enter a (64-bits) Hexa key - 16  characters"
                  : data.algo === "aes128"
                  ? data.keyRadio === "str"
                    ? "Enter a (128-bits) string key - 16  characters"
                    : "Enter a (128-bits) Hexa key - 32  characters"
                  : data.algo === "aes192"
                  ? data.keyRadio === "str"
                    ? "Enter a (192-bits) key - 24  characters"
                    : "Enter a (192-bits) key - 48  characters"
                  : data.algo === "aes256"
                  ? data.keyRadio === "str"
                    ? "Enter a (256-bits) key - 32  characters"
                    : "Enter a (256-bits) key - 64  characters"
                  : " ----"
              }
              onChange={handleChange}
              value={data.key}
              required
              pattern={
                data.algo === "des"
                  ? data.keyRadio === "str"
                    ? ".{8,8}"
                    : "[0-9A-Fa-f]{16,16}"
                  : data.algo === "aes128"
                  ? data.keyRadio === "str"
                    ? ".{16,16}"
                    : "[0-9A-Fa-f]{32,32}"
                  : data.algo === "aes192"
                  ? data.keyRadio === "str"
                    ? "[A-Za-z0-9._%+-]{24,24}"
                    : "[0-9A-Fa-f]{48,48}"
                  : data.algo === "aes256"
                  ? data.keyRadio === "str"
                    ? "[A-Za-z0-9._%+-]{32,32}"
                    : "[0-9A-Fa-f]{64,64}"
                  : " ----"
              }
              title={
                data.keyRadio === "str"
                  ? "8 charachters of any type"
                  : "16 Hexa charachters [a-f & 0-9]"
              }
              autocomplete="off"
            />
            <input
              type="button"
              value="Generate"
              onClick={showAlert}
              id="key-gen"
              aria-disabled
            />
          </div>

          <div className="radio">
            <input
              type="radio"
              name="keyRadio"
              id="key-str"
              value="str"
              onChange={handleChange}
              defaultChecked
            />
            <label htmlFor="key-str">STR</label>
            <input
              type="radio"
              name="keyRadio"
              id="key-hex"
              value="hex"
              onChange={handleChange}
            />
            <label for="key-hex">HEX</label>
          </div>

          {/* PLAINTEXT */}
          <label htmlFor="plainText">
            Plain Text
            <span>(String)</span>
          </label>
          <textarea
            type="text"
            name="plainText"
            id="plainText"
            placeholder="Enter the Plain or Cipher Text"
            onChange={handleChange}
            value={data.plainText}
            required
          />
          <input id="submit" type="submit" value="Encrypt" disabled />
        </form>
      </div>
      <div className="result">
        <p>
          {data.algo === "des"
            ? "Data Encryption Algorithm - DES"
            : data.algo === "des3"
            ? "Triple Data Encryption Algorithm - 3DES"
            : data.algo === "aes128"
            ? "Advanced Encryption Standard - AES (Key Size: 128-bits)"
            : data.algo === "aes192"
            ? "Advanced Encryption Standard - AES (Key Size: 192-bits)"
            : data.algo === "aes256"
            ? "Advanced Encryption Standard - AES (Key Size: 256-bits)"
            : "Algorithm Not Selected"}
        </p>
        <p>
          {data.mode === "ecb"
            ? "Electronic Code Book Mode - ECB"
            : data.mode === "cbc"
            ? "Cipher Block Chaining Mode - CBC"
            : data.mode === "cfb"
            ? "Cipher Feedback Mode - CFB"
            : data.mode === "ofb"
            ? "Output Feedback Mode - OFB"
            : data.mode === "ctr"
            ? "Counter Mode - CTR"
            : "Mode Not Selected"}
        </p>
        <div id="result-cipher">
          <hr />
          <p>
            Number of Blocks: <small>{result.numberOfBlocks}</small>
          </p>
          <p>
            Cipher (Hex):{" "}
            <small>
              {data.algo === "des" || "aes128"
                ? showHexFormat(result.cipherTextBin)
                : "Algorithm Not Selected"}
            </small>
          </p>
          <Link
            to={
              data.algo === "des"
                ? "/des"
                : data.algo === "aes128"
                ? "/aes"
                : data.algo === "aes192"
                ? "/aes"
                : data.algo === "aes256"
                ? "/aes"
                : "*"
            }
            state={
              data.algo === "des"
                ? {
                    plainTextBin: result.plainTextBinBlocks[0]
                      ? result.plainTextBinBlocks[0]
                      : "0000000100100011010001010110011110001001101010111100110111101111",
                    keyBin: result.keyBin
                      ? result.keyBin
                      : "0000000100100011010001010110011110001001101010111100110111101111",
                  }
                : data.algo === "aes128"
                ? {
                    plainTextBin: result.plainTextBinBlocks[0]
                      ? result.plainTextBinBlocks[0]
                      : "00000001001000110100010101100111100010011010101111001101111011110000000100100011010001010110011110001001101010111100110111101111",
                    keyBin: result.keyBin
                      ? result.keyBin
                      : "00000001001000110100010101100111100010011010101111001101111011110000000100100011010001010110011110001001101010111100110111101111",
                  }
                : data.algo === "aes192"
                ? {
                    plainTextBin: result.plainTextBinBlocks[0]
                      ? result.plainTextBinBlocks[0]
                      : "00000001001000110100010101100111100010011010101111001101111011110000000100100011010001010110011110001001101010111100110111101111",
                    keyBin: result.keyBin
                      ? result.keyBin
                      : "100011100111001110110000111101111101101000001110011001000101001011001000000100001111001100101011100000001001000001111001111001010110001011111000111010101101001001010010001011000110101101111011",
                  }
                : data.algo === "aes256"
                ? {
                    plainTextBin: result.plainTextBinBlocks[0]
                      ? result.plainTextBinBlocks[0]
                      : "00000001001000110100010101100111100010011010101111001101111011110000000100100011010001010110011110001001101010111100110111101111",
                    keyBin: result.keyBin
                      ? result.keyBin
                      : "0110000000111101111010110001000000010101110010100111000110111110001010110111001110101110111100001000010101111101011101111000000100011111001101010010110000000111001110110110000100001000110101110010110110011000000100001010001100001001000101001101111111110100",
                  }
                : "*"
            }
          >
            Show Details of first block
            <MdOutlineDoubleArrow />
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Symmetric;
