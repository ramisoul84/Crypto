import { useLocation } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { encrypt } from "../algorithms/aes.js";
import {
  vectorToMatrix,
  showHexFormat,
  matHex,
} from "../algorithms/general.js";
import keyExpansion from "../images/keyExpansion.svg";
import "./aes.css";
const AES = () => {
  const location = useLocation();
  const toggle = (e) => {
    const el = e.target.className;
    const element = document.getElementById(`${el}`);
    console.log(e.target);
    return (element.style.display =
      element.style.display === "block" ? "none" : "block");
  };
  const {
    nK,
    keyBin,
    plainTextBinBlocks,
    roundKeysWords,
    table,
    roundKeys,
    stateMatrix,
    states,
  } = encrypt(location.state.plainTextBin, location.state.keyBin);
  return (
    <section id="aes-details">
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
        <span>{showHexFormat(keyBin)}</span>
      </p>
      <h3>
        Key Expansion: Create {nK + 6} round keys, each of which is (128-bits)
        long.
      </h3>
      <p>
        A Key Expansion algorithm is used to calculate all the round keys from
        the original key. So the initial key is used to create many different
        round keys which will be used in the corresponding round of the
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
          {roundKeysWords.map((e, i) => {
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
        {roundKeysWords.map((e, i) => {
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
      </div>

      <h4 onClick={toggle} className="round-keys-words">
        Round Keys Words <MdOutlineDoubleArrow />
      </h4>
      <div id="round-keys-words">
        <p>From the previous chapter we get the following table</p>
        <table>
          <caption>
            <strong>Expansion of a ({nK * 32}-bits) original Key</strong>
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
        <p>State Matrix and Roundkey No.0 Matrix:</p>
        <div className="tables">
          <table>
            {matHex(vectorToMatrix(plainTextBinBlocks[0])).map((e) => {
              return (
                <tr>
                  <td>{e[0]}</td>
                  <td>{e[1]}</td>
                  <td>{e[2]}</td>
                  <td>{e[3]}</td>
                </tr>
              );
            })}
          </table>
          &oplus;
          <table>
            {matHex(vectorToMatrix(roundKeys[0])).map((e) => {
              return (
                <tr>
                  <td>{e[0]}</td>
                  <td>{e[1]}</td>
                  <td>{e[2]}</td>
                  <td>{e[3]}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <p>
          XOR the corresponding entries, e.g...
          {matHex(vectorToMatrix(plainTextBinBlocks[0]))[1][1]} &oplus;{" "}
          {matHex(vectorToMatrix(roundKeys[0]))[1][1]} ={" "}
          {matHex(stateMatrix[0])[1][1]}
        </p>
        <p>the new State Matrix is</p>
        <table>
          {matHex(stateMatrix[0]).map((e) => {
            return (
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td>{e[2]}</td>
                <td>{e[3]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <h4 onClick={toggle} className="round-1">
        Round 1 <MdOutlineDoubleArrow />
      </h4>
      <div id="round-1">
        <p>current State Matrix is</p>
        <p>
          substitute each byte of current state matrix by corresponding byte in
          AES S-Box
        </p>
        <p>this leads to new State Matrix</p>
        <p>
          four rows are shifted cyclically to the left by offsets of 0,1,2, and
          3
        </p>
        <p>Mix Column multiplies fixed matrix against current State Matrix:</p>
      </div>
      <h4 onClick={toggle} className="cipher">
        Cipher <MdOutlineDoubleArrow />
      </h4>
      <div id="cipher"></div>
    </section>
  );
};
export default AES;
