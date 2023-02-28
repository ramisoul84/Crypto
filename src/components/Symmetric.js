import { useState } from "react";
import { Link } from "react-router-dom";
import * as DesAlgorithm from "../desAlgorithm";
import { MdOutlineDoubleArrow } from "react-icons/md";
import "./symmetric.css";
const Symmetric = () => {
  const [data, setData] = useState({
    algo: "",
    mode: "",
    plainText: "",
    key: "",
    keyRadio: "str",
    plainTextRadio: "str",
  });
  const [result, setResult] = useState({
    numberOfBlocks: 0,
    plainTextBinBlocks: [],
    keyBin: "",
    key56: "",
    key56Halves: [],
    keys48: [],
    addedDigets: 0,
    cipherTextBin: "",
    cipherTextHex: "",
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const plainTextBin =
      data.plainTextRadio === "str"
        ? DesAlgorithm.strToBin(data.plainText)
        : DesAlgorithm.hexToBin(data.plainText);
    const keyBin =
      data.keyRadio === "str"
        ? DesAlgorithm.strToBin(data.key)
        : DesAlgorithm.hexToBin(data.key);
    const {
      numberOfBlocks,
      plainTextBinBlocks,
      key56,
      key56Halves,
      keys48,
      cipherTextBin,
      cipherTextHex,
    } = DesAlgorithm.encrypt(plainTextBin, keyBin);
    setResult((prev) => {
      return {
        ...prev,
        numberOfBlocks: numberOfBlocks,
        plainTextBinBlocks: plainTextBinBlocks,
        keyBin: keyBin,
        key56: key56,
        key56Halves: key56Halves,
        keys48: keys48,
        cipherTextBin: cipherTextBin,
        cipherTextHex: cipherTextHex,
      };
    });
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
            <option value="aes">AES</option>
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
          </label>
          <input
            type="text"
            name="key"
            id="key"
            placeholder={
              data.keyRadio === "str"
                ? "Enter a 64 bits key - 8  characters"
                : "Enter a 64 bits key - 16  characters"
            }
            onChange={handleChange}
            value={data.key}
            required
            //minLength={data.keyRadio === "str" ? 8 : 16}
            pattern={
              data.keyRadio === "str"
                ? "[A-Za-z0-9._%+-]{8,8}"
                : "[0-9A-Fa-f]{16,16}"
            }
            title={
              data.keyRadio === "str"
                ? "8 charachters of any type"
                : "16 Hexa charachters [a-f & 0-9]"
            }
            autocomplete="off"
          />
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
            <span>
              ({data.plainTextRadio === "str" ? "String" : "Hexadecimal "})
            </span>
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
          <div className="radio">
            <input
              type="radio"
              name="plainTextRadio"
              id="plainText-str"
              value="str"
              onChange={handleChange}
              defaultChecked
            />
            <label htmlFor="key-str">String</label>
            <input
              type="radio"
              name="plainTextRadio"
              id="plainText-hex"
              value="hex"
              onChange={handleChange}
            />
            <label htmlFor="key-hex">HEX</label>
          </div>
          <input type="submit" value="Encrypt" />
        </form>
      </div>
      <div className="result">
        <p>
          {data.algo === "des"
            ? "Data Encryption Algorithm - DES"
            : data.algo === "des3"
            ? "Triple Data Encryption Algorithm - 3DES"
            : data.algo === "aes"
            ? "Advanced Encryption Standard - AES"
            : "Not Selected"}
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
            : "Not Selected"}
        </p>

        <hr />
        <p>Cipher (Hex):</p>
        <small>{result.cipherTextHex}</small>
        <Link
          to="/des"
          state={{
            plainTextBin: result.plainTextBinBlocks[0]
              ? result.plainTextBinBlocks[0]
              : "0000000100100011010001010110011110001001101010111100110111101111",
            keyBin: result.keyBin
              ? result.keyBin
              : "0000000100100011010001010110011110001001101010111100110111101111",
          }}
        >
          Show Details <MdOutlineDoubleArrow />
        </Link>
      </div>
    </section>
  );
};
export default Symmetric;
