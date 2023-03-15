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

const AES = () => {
  const mixTable = [2, 3, 1, 1, 1, 2, 3, 1, 1, 1, 2, 3, 3, 1, 1, 2];
  const location = useLocation();
  const toggle = (e) => {
    const el = e.target.className;
    const element = document.getElementById(`${el}`);
    console.log(e.target);

    return (element.style.display =
      element.style.display === "block" ? "none" : "block").then(
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    );
  };
  const {
    nK,
    plainTextBinBlocks,
    roundKeysWords,
    table,
    roundKeys,
    states,
    cipherTextBin,
  } = Aes.encrypt(location.state.plainTextBin, location.state.keyBin);
  return (
    <section id="aes">
      <h1>Advanced Encryption Standard - AES</h1>
      <p>
        is a block cipher algorithm that takes plain text in blocks of (128-bit)
        and converts them to ciphertext using key of (128-bit) or (196-bit) or
        (256-bit). It is a symmetric key algorithm, which means that the same
        key is used for encrypting and decrypting data.
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
        AES uses a key schedule to expand the initial key into {nK + 6} separate
        round keys , to be used in the corresponding round of the encryption.
      </p>
      <h4 onClick={toggle} className="key-schedule">
        key schedule <MdOutlineDoubleArrow />
      </h4>
      <div id="key-schedule">
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
          <th> </th>
          <th>RoundKey 0</th>
          <th> </th>
          <th>State 0</th>
          <tbody className="round">
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
          by corresponding byte according to AES S-Box
        </p>
        <table>
          <th>
            State<sub>0</sub>
          </th>
          <th></th>
          <th>SubBytes</th>
          <tbody className="round">
            <td>{createTable(4, 4, vectorToArrHex(states[1][0]))}</td>
            <td>&rArr;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][1]))}</td>
          </tbody>
        </table>
        <p>
          Where we replaced{" "}
          <div className="border">{vectorToArrHex(states[1][0])[5]}</div> with{" "}
          <div className="border">{vectorToArrHex(states[1][1])[5]}</div> , that
          we've got from the S-Box in row=
          {vectorToArrHex(states[1][0])[5][0]}
          <sub>16</sub>={parseInt(vectorToArrHex(states[1][0])[5][0], 16)} and
          column=
          {vectorToArrHex(states[1][0])[5][1]}
          <sub>16</sub>={parseInt(vectorToArrHex(states[1][0])[5][1], 16)}
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
        <table>
          <th>SubBytes</th>
          <th></th>
          <th>ShiftRows</th>
          <tbody className="round">
            <td>{createTable(4, 4, vectorToArrHex(states[1][1]))}</td>
            <td>&rArr;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][2]))}</td>
          </tbody>
        </table>
        <p>
          <strong>MixColumns:</strong>
        </p>
        <table>
          <tbody className="round">
            <td>{createTable(4, 4, mixTable)}</td>
            <td>&bull;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][2]))}</td>
            <td>&rArr;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][3]))}</td>
          </tbody>
        </table>
        Where {vectorToArrHex(states[1][3])[0]} is result of ({mixTable[0]}
        &bull;
        {vectorToArrHex(states[1][2])[0]})&oplus;({mixTable[1]}
        &bull;
        {vectorToArrHex(states[1][2])[4]})&oplus;({mixTable[2]}
        &bull;
        {vectorToArrHex(states[1][2])[8]})&oplus;({mixTable[3]}
        &bull;
        {vectorToArrHex(states[1][2])[12]})
        <table>
          <th>ShiftRows</th>
          <th></th>
          <th>MixColumns</th>
          <tbody className="round">
            <td>{createTable(4, 4, vectorToArrHex(states[1][2]))}</td>
            <td>&rArr;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][3]))}</td>
          </tbody>
        </table>
        <p>
          <strong>Add Round Key</strong>: Now the resultant output of the
          previous stage is XOR-ed with the corresponding round key
        </p>
        <table>
          <th>MixColumns</th>
          <th></th>
          <th>
            RoundKey<sub>1</sub>
          </th>
          <th></th>
          <th>
            State<sub>1</sub>
          </th>
          <tbody className="round">
            <td>{createTable(4, 4, vectorToArrHex(states[1][3]))}</td>
            <td>&oplus;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][4]))}</td>
            <td>&rArr;</td>
            <td>{createTable(4, 4, vectorToArrHex(states[1][5]))}</td>
          </tbody>
        </table>
        <table className="table-states">
          <th>i</th>
          <th>
            State<sub>i-1</sub>
          </th>
          <th>SubBytes</th>
          <th>ShiftRows</th>
          <th>MixColumns</th>
          <th>
            Round Key<sub>i</sub>
          </th>
          <th>
            State<sub>i</sub>
          </th>
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
                    <td className="rounds-table">
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
          <table>
            <th>
              State<sub>{nK + 5}</sub>
            </th>
            <th>SubBytes</th>
            <th>ShiftRows</th>
            <th></th>
            <th>
              RoundKey<sub>{nK + 6}</sub>
            </th>
            <th></th>
            <th>
              State<sub>{nK + 6}</sub>
            </th>
            <tbody className="round">
              <td>{createTable(4, 4, vectorToArrHex(states[nK + 6][0]))}</td>
              <td>{createTable(4, 4, vectorToArrHex(states[nK + 6][1]))}</td>
              <td>{createTable(4, 4, vectorToArrHex(states[nK + 6][2]))}</td>
              <td>&oplus;</td>
              <td>{createTable(4, 4, vectorToArrHex(states[nK + 6][4]))}</td>
              <td>&rArr;</td>
              <td>{createTable(4, 4, vectorToArrHex(states[nK + 6][5]))}</td>
            </tbody>
          </table>
        </div>

        <p>
          Cipher Text is:
          <span>{showHexFormat(cipherTextBin.substring(0, 128))}</span>
        </p>
      </div>
    </section>
  );
};
export default AES;
