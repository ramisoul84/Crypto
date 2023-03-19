import { useState } from "react";
import * as EEc from "../algorithms/ecc";
import "./ecc.css";

const ECC = () => {
  const [curve, setCurve] = useState({
    a: 0,
    b: 0,
    p: 0,
  });
  const [points, setPoints] = useState([{}]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCurve((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let a = Number(curve.a);
    let b = Number(curve.b);
    let p = Number(curve.p);
    setPoints(EEc.pointsGen(a, b, p));
  };
  return (
    <section id="ecc">
      <p>
        Cryptography uses elliptic curves in a simplified form (Weierstras
        form), which is defined as: y<sup>2</sup>=x<sup>3</sup>+
        <strong>a</strong>x+<strong>b</strong> over 𝔽<sub>p</sub>
      </p>
      <p></p>
      <p>Elliptic Curves over Finite Fields</p>
      <form onSubmit={handleSubmit}>
        <label>a</label>
        <input type="number" name="a" onChange={handleChange} value={curve.a} />
        <label>b</label>
        <input type="number" name="b" onChange={handleChange} value={curve.b} />
        <label>p</label>
        <input type="number" name="p" onChange={handleChange} value={curve.p} />
        <br></br>
        <input type="submit" value="Generate Points" />
      </form>
      <p>
        y<sup>2</sup>=x<sup>3</sup>+{curve.a}
        x+{curve.b} over 𝔽<sub>{curve.p}</sub>
      </p>
      <p>Points</p>
      <p>
        {points.map((e) => {
          return (
            <p>
              ({e[0]},{e[1]})
            </p>
          );
        })}
      </p>
    </section>
  );
};
export default ECC;
