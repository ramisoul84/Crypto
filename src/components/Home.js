import { Link } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import "./home.css";
const Home = () => {
  return (
    <section id="home">
      <p>
        Cryptography is the study of secure communications techniques that allow
        only the sender and intended recipient of a message to view its
        contents.
      </p>
      <p>Cryptography can be broken down into three different types:</p>
      <h4>1. Secret Key Cryptography.</h4>
      <p>
        It is an encryption system where the sender and receiver of message use
        a single common key to encrypt and decrypt messages. Symmetric Key
        Systems are faster and simpler but the problem is that sender and
        receiver have to somehow exchange key in a secure manner.{" "}
      </p>
      <div className="examples">
        <Link
          to="des"
          state={{
            plainTextBin:
              "0000000100100011010001010110011110001001101010111100110111101111",
            keyBin:
              "0000000100100011010001010110011110001001101010111100110111101111",
          }}
        >
          DES <MdOutlineDoubleArrow />
        </Link>
        <Link to="3des">
          Triple DES <MdOutlineDoubleArrow />
        </Link>
        <Link to="aes">
          AES <MdOutlineDoubleArrow />
        </Link>
      </div>
      <h4>2. Public Key Cryptography.</h4>
      <p>
        Under this system a pair of keys is used to encrypt and decrypt
        information. A public key is used for encryption and a private key is
        used for decryption. Public key and Private Key are different. Even if
        the public key is known by everyone the intended receiver can only
        decode it because he alone knows the private key.
      </p>
      <div className="examples">
        <Link to="rsa">
          RSA <MdOutlineDoubleArrow />
        </Link>
        <Link to="ecc">
          ECC <MdOutlineDoubleArrow />
        </Link>
      </div>
      <h4>3. Hash Functions.</h4>
      <p>
        There is no usage of any key in this algorithm. A hash value with fixed
        length is calculated as per the plain text which makes it impossible for
        contents of plain text to be recovered. Many operating systems use hash
        functions to encrypt passwords.
      </p>
      <div className="examples">
        {" "}
        <Link to="sha">
          SHA-256 <MdOutlineDoubleArrow />
        </Link>
      </div>
    </section>
  );
};
export default Home;
