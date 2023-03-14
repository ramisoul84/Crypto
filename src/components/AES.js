import { useLocation } from "react-router-dom";
import * as Aes from "../algorithms/aes";
import {
  showHexFormat,
  createTable,
  vectorToArrHex,
} from "../algorithms/gMethods";
import { MdOutlineDoubleArrow } from "react-icons/md";
import keyExpansion from "../images/keyExpansion.svg";
import "./aes.css";
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
const AES = () => {
  const location = useLocation();
  const toggle = (e) => {
    const el = e.target.className;
    const element = document.getElementById(`${el}`);
    console.log(e.target);
    return (element.style.display =
      element.style.display === "block" ? "none" : "block");
  };
  const { nK, plainTextBinBlocks, roundKeysWords, table, roundKeys, states } =
    Aes.encrypt(location.state.plainTextBin, location.state.keyBin);
  return (
    <section id="aes">
      <h1>Advanced Encryption Standard - AES</h1>
      <p>
        is a block cipher algorithm that takes plain text in blocks of
        (128-bits) and converts them to ciphertext using key of (128-bits) or
        (196-bits) or (256-bits). It is a symmetric key algorithm, which means
        that the same key is used for encrypting and decrypting data.
      </p>
      <h3>How Does DES Encryption Work?</h3>
      <p>
        Let <strong>M</strong> be a (128-bits) block of a plain text, and
        <strong> K</strong> a ({nK * 32}-bits) key - both of them in Hexadecimal
        format:
        <br></br>
        <strong>M=</strong>
        <span>{showHexFormat(plainTextBinBlocks[0])}</span>
        <br></br>
        <strong>K=</strong>
        <span>{showHexFormat(location.state.keyBin)}</span>
      </p>
      <h3>
        Key Expansion: Create {nK + 6} round keys, each of which is (128-bit)
        long.
      </h3>
      <p>
        A Key Expansion algorithm is used to calculate all the round keys from
        the original key, to be used in the corresponding round of the
        encryption.
      </p>

      <h4 onClick={toggle} className="expended-key">
        Create (32-bit) words of the expanded key <MdOutlineDoubleArrow />
      </h4>
      <div id="expended-key">
        <strong>Define:</strong>
        <p>
          &bull;&emsp;<strong>N</strong> as the length of the key in (32-bit)
          words&emsp;&rArr;&emsp;<strong>N= </strong>
          <span>{nK}</span>
        </p>
        <p>
          &bull;&emsp;
          {roundKeysWords.slice(0, nK).map((e, i) => {
            return (
              <p className="words">
                <strong>
                  K<sub>{i}</sub>&ensp;
                </strong>
              </p>
            );
          })}
          as the (32-bit) words of the original key
        </p>
        &emsp;&emsp;&emsp;
        {roundKeysWords.slice(0, nK).map((e, i) => {
          return (
            <p className="words">
              <strong>
                K<sub>{i}</sub>
              </strong>
              =<span>{showHexFormat(e)}</span>&emsp;
            </p>
          );
        })}
        <p>
          &bull;&emsp;<strong>R</strong> as the number of round keys
          needed&emsp;&rArr;&emsp;<strong>R= </strong>
          <span>{nK + 6}</span>
        </p>
        <p>
          &bull;&emsp;
          <strong>
            W<sub>0</sub>
          </strong>
          ,{" "}
          <strong>
            W<sub>1</sub>
          </strong>
          , ...{" "}
          <strong>
            W<sub>{4 * (nK + 7) - 1}</sub>
          </strong>{" "}
          as the (32-bit) words of the expanded key where:{" "}
          <strong>4*(R+1)-1 =</strong> <span>{4 * (nK + 7) - 1}</span>
        </p>
        <p>
          &bull;&emsp;<strong>RotWord</strong> as a one-byte left circular shift
        </p>
        <p>
          &emsp;&emsp;&emsp;
          <strong>
            RotWord([b<sub>0</sub> b<sub>1</sub> b<sub>2</sub> b<sub>3</sub>
            ])=[b<sub>1</sub> b<sub>2</sub> b<sub>3</sub> b<sub>0</sub>]
          </strong>
        </p>
        <p>
          &bull;&emsp;<strong>SubWord</strong> as an application of the AES
          S-box to each of the four bytes of the word:
        </p>
        <p>
          &emsp;&emsp;&emsp;
          <strong>
            SubWord([b<sub>0</sub> b<sub>1</sub> b<sub>2</sub> b<sub>3</sub>
            ])=[S(b<sub>0</sub>) S(b<sub>1</sub>) S(b<sub>2</sub>) S(b
            <sub>3</sub>)]
          </strong>
        </p>
        <p>
          &bull;&emsp;
          <strong>
            rcon<sub>(i/N)</sub>
          </strong>{" "}
          as a round constant
        </p>
        <p>
          Then for{" "}
          <strong>
            i= <span>0 .... {4 * (nK + 7) - 1}</span>
          </strong>
        </p>
        <img src={keyExpansion} alt="key expansion" />
        <table>
          <caption>S-Box</caption>
          {createTable(8, 8, sBox)}
        </table>
      </div>

      <h4 onClick={toggle} className="round-keys-words">
        Round Keys Words <MdOutlineDoubleArrow />
      </h4>
      <div id="round-keys-words">
        <p>From the previous chapter we get the following table</p>
        <table>
          <caption>
            <strong>Expansion of a ({nK * 32}-bit) original Key</strong>
          </caption>
          <tr>
            <th>i</th>
            <th>
              W<sub>i-1</sub>
            </th>
            <th>RotWord()</th>
            <th>SubWord()</th>
            <th>
              &oplus; rcon<sub>(i/N)</sub>
            </th>
            <th>
              W<sub>i-N</sub>
            </th>
            <th>
              W<sub>i</sub>
            </th>
          </tr>
          {table.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <strong>{index}</strong>
                </td>
                <td>
                  <span>{showHexFormat(item[0])}</span>
                </td>
                <td>
                  <span>{showHexFormat(item[1])}</span>
                </td>
                <td>
                  <span>{showHexFormat(item[2])}</span>
                </td>
                <td>
                  <span>{showHexFormat(item[3])}</span>
                </td>
                <td>
                  <span>{showHexFormat(item[4])}</span>
                </td>
                <td>
                  <span>{showHexFormat(item[5])}</span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <h4 onClick={toggle} className="round-keys">
        Round Keys <MdOutlineDoubleArrow />
      </h4>
      <div id="round-keys">
        <p>From the previous table we get all round keys </p>
        {roundKeys.map((e, i) => {
          return (
            <p className="round-keys-table">
              <strong>
                &bull;Round Key <sub>{i}</sub>
              </strong>
              <strong>
                w<sub>{i * 4}</sub>+ w<sub>{i * 4 + 1}</sub>+w
                <sub>{i * 4 + 2}</sub>+w<sub>{i * 4 + 3}</sub>
              </strong>
              <strong>&rArr;</strong>
              <span>{showHexFormat(e)}</span>
            </p>
          );
        })}
      </div>

      <h3>Encode each (128-bit) block of the message.</h3>
      <h4 onClick={toggle} className="round-0">
        Round 0 <MdOutlineDoubleArrow />
      </h4>
      <div id="round-0">
        <table>
          <th>Plain Text</th>
          <th>&oplus;</th>
          <th>RoundKey 0</th>
          <th>&rArr;</th>
          <th>State 0</th>
          <tbody>
            <td>{createTable(4, 4, vectorToArrHex(states[0][0]))}</td>
            <td>&oplus;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[0][4]))}</td>
            <td>&rArr;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[0][5]))}</td>
          </tbody>
        </table>
      </div>
      <h4 onClick={toggle} className="round-1">
        Rounds &emsp; 1 &rarr; {nK + 5} <MdOutlineDoubleArrow />
      </h4>
      <div id="round-1">
        <p> Each round comprises of 4 steps :</p>
        <p>
          <strong>SubBytes: </strong>replace each byte of current state matrix
          by corresponding byte in AES S-Box
        </p>
        <p>
          <strong>ShiftRows: </strong>Each row is shifted a particular number of
          times.
        </p>
        <ul
          style={{
            marginLeft: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <li>The first row is not shifted</li>
          <li>The second row is shifted once to the left.</li>
          <li>The third row is shifted twice to the left.</li>
          <li>The fourth row is shifted thrice to the left.</li>
        </ul>
        <p>
          <strong>MixColumns:</strong>
        </p>
        <p>
          <strong>Add Round Key</strong>
        </p>
        <table className="table-states">
          <th>i</th>
          <th>Current State</th>
          <th>SubBytes</th>
          <th>ShiftRows</th>
          <th>MixColumns</th>
          <th>Add Round Key</th>
          <th>New State</th>
          {states.slice(1, nK + 6).map((e, i) => {
            return (
              <tr>
                <td
                  style={{
                    color: "var(--color-dark)",
                    fontWeight: "bolder",
                  }}
                >
                  {i + 1}
                </td>
                {e.map((ee) => {
                  return (
                    <td style={{ border: 0, padding: "0 auto" }}>
                      {createTable(4, 4, vectorToArrHex(ee))}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      </div>

      <h4 onClick={toggle} className="round-last">
        Round {nK + 6} <MdOutlineDoubleArrow />
      </h4>
      <div id="round-last">
        <p>in last round we do all steps as last chapter, except MixColumns</p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <table>{createTable(4, 4, vectorToArrHex(states[nK + 6][0]))}</table>
          <p>subByte</p>
          <table>{createTable(4, 4, vectorToArrHex(states[nK + 6][1]))}</table>
          <p>ShiftRows</p>
          <table>{createTable(4, 4, vectorToArrHex(states[nK + 6][2]))}</table>
          <p>RoundKey</p>
          <table>{createTable(4, 4, vectorToArrHex(states[nK + 6][5]))}</table>
        </div>

        <p>Cipher Text is:{showHexFormat(states[nK + 6][5])}</p>
      </div>
    </section>
  );
};
export default AES;
