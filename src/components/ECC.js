import { useState, useEffect } from "react";
import * as EEc from "../algorithms/ecc";
import "./ecc.css";

const ECC = () => {
  const list = [
    5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73,
    79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157,
    163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
    241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331,
    337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
    431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509,
    521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613,
    617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709,
    719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821,
    823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919,
    929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
  ];
  const [curve, setCurve] = useState({
    a: 0,
    b: 0,
    p: 0,
  });
  const [mult, setMult] = useState({
    k: 0,
    x: 0,
    y: 0,
  });
  const [points, setPoints] = useState([]);
  const [pointsX, setPointsX] = useState([]);
  const [pointsY, setPointsY] = useState([]);

  const [mPoints, setMPoints] = useState([]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCurve((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChange1 = (e) => {
    const { value, name } = e.target;
    setMult((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPoints(EEc.pointsGen(curve.a, curve.b, curve.p));
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();

    setMPoints(
      EEc.multPoint([mult.x, mult.y], mult.k, curve.a, curve.b, curve.p)
    );
  };
  const setX = () => {
    let x = [];
    points.map((e) => {
      return x.push(e[0]);
    });
    setPointsX(x);
  };
  const setY = () => {
    let y = [];
    for (let i = 0; i < points.length; i++) {
      if (points[i][0] == mult.x) y.push(points[i][1]);
    }
    setPointsY(y);
  };
  useEffect(setX, [points]);
  useEffect(setY, [mult.x, points]);
  return (
    <section id="ecc">
      <p>
        The elliptic curve cryptography (ECC) uses elliptic curves over the
        finite field 𝔽p (where p is prime and p &gt; 3) . This means that the
        field is a square matrix of size[p x p] and the points on the curve are
        limited to integer coordinates within the field only. All algebraic
        operations within the field (like point addition and multiplication)
        result in another point within the field. The elliptic curve equation
        over the finite field 𝔽p takes the following modular form: y<sup>2</sup>
        =x
        <sup>3</sup>+<strong>a</strong>x+<strong>b</strong> over 𝔽<sub>p</sub>
      </p>

      <strong>Example</strong>
      <p>
        Here a examples of simple Elliptic Curve over Finite Field, where
        [3&lt;p&lt;1000]
      </p>

      <form onSubmit={handleSubmit} className="ecc-example">
        <label>a</label>
        <input type="number" name="a" onChange={handleChange} value={curve.a} />
        <label>b</label>
        <input type="number" name="b" onChange={handleChange} value={curve.b} />
        <label>p</label>
        <select name="p" onChange={handleChange} value={curve.p}>
          {list.map((e) => {
            return <option>{e}</option>;
          })}
        </select>
        <input type="submit" value="Generate a Curve Points" />
      </form>
      <p>
        y<sup>2</sup>=x<sup>3</sup>+{curve.a}
        x+{curve.b} over 𝔽<sub>{curve.p}</sub> Points
      </p>
      <p>
        {points.map((e, i) => {
          return (
            <>
              ({e[0]},{e[1]})
            </>
          );
        })}
        ,and O (Infinity)
      </p>
      <p>Number of Points in this curve:{points.length + 1}</p>
      <strong>Point Multiplication</strong>
      <form onSubmit={handleSubmit1} className="ecc-mult">
        <label>k</label>
        <input type="number" name="k" onChange={handleChange1} value={mult.k} />
        <label>x</label>

        <select name="x" onChange={handleChange1} value={mult.x}>
          {pointsX.map((e) => {
            return <option>{e}</option>;
          })}
        </select>
        <label>y</label>
        <select name="y" onChange={handleChange1} value={mult.y}>
          {pointsY.map((e) => {
            return <option>{e}</option>;
          })}
        </select>
        <input type="submit" value="Points Multiplication" />
      </form>
      <p>
        multiply the generator point G({mult.x},{mult.y}) by 0, 1, .., {mult.k}
      </p>
      <p>
        {mPoints.map((e, i) => {
          return (
            <p>
              {i}P={e[0] === null ? "Infinity" : `(${e[0]},${e[1]})`}
            </p>
          );
        })}
      </p>
    </section>
  );
};
export default ECC;
