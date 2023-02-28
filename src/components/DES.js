import { useLocation } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import * as DesAlgorithm from "../desAlgorithm";
import "./des.css";
const DES = () => {
  const location = useLocation();
  const toggle = (e) => {
    const el = e.target.className;
    const element = document.getElementById(`${el}`);
    console.log(e.target);
    return (element.style.display =
      element.style.display === "block" ? "none" : "block");
  };
  const {
    PC1,
    shiftSteps,
    PC2,
    IP,
    numberOfBlocks,
    plainTextBinBlocks,
    keyBin,
    key56,
    key56Halves,
    keys48,
    textIP,
    E,
    cipherTextBin,
    cipherTextHex,
  } = DesAlgorithm.encrypt(location.state.plainTextBin, location.state.keyBin);
  return (
    <section id="des-details">
      <h1>Data Encryption Standard - DES</h1>
      <p>
        is a block cipher algorithm that takes plain text in blocks of 64 bits
        and converts them to ciphertext using keys of 48 bits. It is a symmetric
        key algorithm, which means that the same key is used for encrypting and
        decrypting data.
      </p>
      <h3>How Does DES Encryption Work?</h3>
      <p>
        Let <strong>M</strong> be a (64-bits) block of a plain text, and
        <strong> K</strong> a (64-bits) key - both of them in binary format:
        <br></br>
        <strong>M=</strong>
        <span>{plainTextBinBlocks[0]}</span>
        <br></br>
        <strong>K=</strong>
        <span>{keyBin}</span>
      </p>
      <h3>Step 1: Create 16 subkeys, each of which is (48-bits) long.</h3>
      <h4 onClick={toggle} className="pc1">
        Permute the key through the PC-1 table <MdOutlineDoubleArrow />
      </h4>
      <div id="pc1">
        <p>
          The 64-bit key is permuted according to the <strong>PC-1</strong>
          table. The 57th bit of the original key <strong>K</strong> becomes the
          first bit of the permuted key <strong>K+</strong>. The 49th bit of the
          original key becomes the second bit of the permuted key, and so on.
        </p>
        <table>
          <caption>
            <strong>PC-1</strong>
          </caption>
          <tr>
            {PC1.slice(0, 7).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(7, 14).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(14, 21).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(21, 28).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(28, 35).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(35, 42).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(42, 49).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC1.slice(49, 56).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
        </table>
        <p>we get the (56-bit) permutated key</p>
        <p>
          <strong>K+= </strong>
          <span>{key56}</span>
        </p>
      </div>

      <h4 onClick={toggle} className="shift">
        Shiftting each half <MdOutlineDoubleArrow />
      </h4>
      <div id="shift">
        <p>
          Next, we split this permuted key into left and right halves,
          <strong>
            C<sub>0 </sub>
          </strong>
          and
          <strong>
            D<sub>0 </sub>
          </strong>
          , where each half has 28 bits.
        </p>
        <p>
          <strong>
            C<sub>0</sub>
          </strong>
          = <span>{key56.substring(0, 28)}</span>&emsp;
          <strong>
            D<sub>0</sub>
          </strong>
          = <span>{key56.substring(28, 56)}</span>
        </p>
        <p>Now we shift each half according to the this table:</p>
        <table>
          <th>Round</th>
          {shiftSteps.map((e, i) => {
            return <td>{i + 1}</td>;
          })}
          <tr></tr>
          <th>Shifts</th>
          {shiftSteps.map((e, i) => {
            return <td>{e}</td>;
          })}
        </table>
        {key56Halves.map((e, i) => {
          return (
            <>
              <p>
                <strong>
                  C<sub>{i + 1}</sub>=
                </strong>
                <span>{e.substring(0, 28)}</span>&emsp;
                <strong>
                  D<sub>{i + 1}</sub>=
                </strong>
                <span>{e.substring(28, 56)}</span>
              </p>
            </>
          );
        })}
      </div>
      <h4 onClick={toggle} className="concatenate">
        Concatenation <MdOutlineDoubleArrow />
      </h4>
      <div id="concatenate">
        <p>
          Next we concatenate <strong>C</strong> and <strong>D</strong>:
        </p>
        {key56Halves.map((e, i) => {
          return (
            <>
              <p>
                <strong>
                  C<sub>{i + 1}</sub>
                </strong>
                <strong>
                  D<sub>{i + 1}</sub>=
                </strong>
                <span>{e}</span>
              </p>
            </>
          );
        })}
      </div>
      <h4 onClick={toggle} className="pc2">
        Permute the key through the PC-2 table <MdOutlineDoubleArrow />
      </h4>
      <div id="pc2">
        <p>
          Now we apply another permutation (PC-2 table) to each of the the 16
          CnDn keys we obtained from the previous step.
        </p>
        <table>
          <caption>
            <strong>PC-2</strong>
          </caption>
          <tr>
            {PC2.slice(0, 6).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(6, 12).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(12, 18).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(18, 24).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(24, 30).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(30, 36).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(36, 42).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {PC2.slice(42, 48).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
        </table>
        {keys48.map((e, i) => {
          return (
            <p>
              <strong>
                K<sub>{i + 1}</sub>=
              </strong>
              <span>{e}</span>
            </p>
          );
        })}
      </div>
      <h3>Step 2: Encode each (64-bit) block of the message.</h3>
      <h4 onClick={toggle} className="ip">
        Permute the message through IP <MdOutlineDoubleArrow />
      </h4>
      <div id="ip">
        <p>
          We apply the initial permutation (IP table) to the block of text{" "}
          <strong>M</strong>, given previously
        </p>
        <p>
          <strong>M=</strong>
          <span>{plainTextBinBlocks[0]}</span>
        </p>
        <table>
          <caption>
            <strong>IP</strong>
          </caption>
          <tr>
            {IP.slice(0, 8).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(8, 16).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(16, 24).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(24, 32).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(32, 40).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(40, 48).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(48, 56).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {IP.slice(56, 64).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
        </table>

        <p>we get:</p>
        <p>
          <strong>IP=</strong>
          <span>{textIP}</span>
        </p>
      </div>
      <h4 onClick={toggle} className="encode">
        Encode the data <MdOutlineDoubleArrow />
      </h4>
      <div id="encode">
        <p>we split the IP permuted message into two halves of 32-bits:</p>
        <p>
          <strong>
            L<sub>0</sub>
          </strong>
          = <span>{textIP.substring(0, 32)}</span>&emsp;
          <strong>
            R<sub>0</sub>
          </strong>
          = <span>{textIP.substring(32, 64)}</span>
        </p>
        <p>
          Next er will iterate through 16 cycles, each using one of the 16
          (48-bit) keys we computed previously. We will use a function{" "}
          <strong>f</strong> which operates over a data block of (32 bits) and a
          key Kn of (48 bits) to produce a (32 bits) block. For n from 1 to 16
          we compute:
        </p>
        <p>
          <strong>
            L<sub>n</sub>
          </strong>
          =
          <strong>
            R<sub>n-1</sub>
          </strong>
        </p>
        <p>
          <strong>
            R<sub>n</sub>
          </strong>
          =
          <strong>
            L<sub>n-1</sub>
          </strong>
          ⊕<strong>f</strong>(
          <strong>
            R<sub>n-1</sub>
          </strong>
          ,
          <strong>
            k<sub>n</sub>
          </strong>
          )
        </p>
        <p>
          Where <strong>f</strong> = <strong>P</strong>(<strong>S</strong>(
          <strong>
            k<sub>n</sub>
          </strong>
          ⊕ <strong>E</strong>(
          <strong>
            R<sub>n</sub>
          </strong>
          )))
        </p>
        <p>
          where <strong>E</strong> expands (32 bits) into (48 bits) using the
          following table:
        </p>
        <table>
          <caption>
            <strong>E</strong>
          </caption>
          <tr>
            {E.slice(0, 6).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(6, 12).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(12, 18).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(18, 24).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(24, 30).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(30, 36).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(36, 42).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
          <tr>
            {E.slice(42, 48).map((e) => {
              return <td>{e}</td>;
            })}
          </tr>
        </table>
        <p>
          Then <strong>S</strong> splits the (48 bits) into eight groups of six
          bits, and each group gets ran through the S-box as follows:
        </p>
      </div>
    </section>
  );
};
export default DES;
