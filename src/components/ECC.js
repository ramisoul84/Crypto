import { useState, useEffect } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import * as EEc from "../algorithms/ecc";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
    const chart = document.querySelector(".ecc-simple-res");
    setPoints(EEc.pointsGen(curve.a, curve.b, curve.p));

    chart.style.display = "block";
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
    x = x.filter((item, index) => x.indexOf(item) === index);
    setPointsX(x);
  };
  const setY = () => {
    let y = [];
    for (let i = 0; i < points.length; i++) {
      if (points[i][0] == mult.x) y.push(points[i][1]);
    }
    setPointsY(y);
  };
  const set0 = () => {
    setMult((prev) => {
      return {
        ...prev,
        y: pointsY[0],
      };
    });
  };
  useEffect(setX, [points]);
  useEffect(setY, [mult.x, points]);
  useEffect(set0, [pointsY, pointsX]);
  return (
    <section id="ecc">
      <h1>Elliptic Curve Cryptography - ECC</h1>

      <p>
        ECC uses elliptic curves over the finite field 𝔽p (where p is prime and
        p &gt; 3) . This means that the field is a square matrix of size[p x p]
        and the points on the curve are limited to integer coordinates within
        the field only. All algebraic operations within the field (like point
        addition and multiplication) result in another point within the field.
        The elliptic curve equation over the finite field 𝔽p takes the following
        modular form: y<sup>2</sup>
        =x
        <sup>3</sup>+<strong>a</strong>x+<strong>b</strong> over 𝔽<sub>p</sub>
      </p>
      <h4 onClick={toggle} className="ECC-simple">
        Creare a simple EC <MdOutlineDoubleArrow />
      </h4>
      <div id="ECC-simple">
        <p>Enter Elliptic Curve parameters, where [3&lt;p&lt;1000]</p>
        <form onSubmit={handleSubmit} className="ecc-example">
          <label>a</label>
          <input
            type="number"
            name="a"
            onChange={handleChange}
            value={curve.a}
          />
          <label>b</label>
          <input
            type="number"
            name="b"
            onChange={handleChange}
            value={curve.b}
          />
          <label>p</label>
          <select name="p" onChange={handleChange} value={curve.p}>
            {list.map((e) => {
              return <option>{e}</option>;
            })}
          </select>
          <input type="submit" value="Generate a Curve Points" />
        </form>
        <div className="ecc-simple-res">
          <p>
            y<sup>2</sup>=x<sup>3</sup>+{curve.a}
            x+{curve.b} over 𝔽<sub>{curve.p}</sub> Points:
          </p>
          <p style={{ fontSize: "0.7rem" }}>
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
          <ResponsiveContainer width="90%" height={500}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <Tooltip cursor={{}} />
              <Scatter
                data={points.map((e, i) => {
                  return { x: e[0], y: e[1] };
                })}
                fill="var(--color-dark)"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
      <h4 onClick={toggle} className="ECC-add">
        Adding 2 points in ECC <MdOutlineDoubleArrow />
      </h4>
      <div id="ECC-add">
        <p>
          Adding two points In ECC: y<sup>2</sup>=x
          <sup>3</sup>+{curve.a}
          x+{curve.b} over 𝔽<sub>{curve.p}</sub>{" "}
        </p>
        <form>
          <label>P</label>
          <input type="number" placeholder="x" />
          <input type="number" placeholder="y" />
          <br></br>
          <label>Q</label>
          <input type="number" placeholder="x" />
          <input type="number" placeholder="y" />
          <input type="submit" />
        </form>
      </div>
      <h4 onClick={toggle} className="ECC-Multi">
        Multiplying ECC Point by Integer <MdOutlineDoubleArrow />
      </h4>
      <div id="ECC-Multi">
        <form onSubmit={handleSubmit1} className="ecc-mult">
          <label>k</label>
          <input
            type="number"
            name="k"
            onChange={handleChange1}
            value={mult.k}
          />
          <label>G</label>
          <select name="x" onChange={handleChange1} value={mult.x}>
            <option>x</option>
            {pointsX.map((e) => {
              return <option>{e}</option>;
            })}
          </select>
          <label>,</label>
          <select
            name="y"
            onChange={handleChange1}
            value={mult.y}
            placeholder="y"
          >
            <option>y</option>
            {pointsY.map((e) => {
              return <option>{e}</option>;
            })}
          </select>
          <input type="submit" value="Points Multiplication" />
        </form>
        <p>
          multiply the generator point G({mult.x},{mult.y}) by 0, 1, ..,{" "}
          {mult.k} In ECC: y<sup>2</sup>=x<sup>3</sup>+{curve.a}
          x+{curve.b} over 𝔽<sub>{curve.p}</sub>
        </p>
        <table>
          {mPoints.map((e, i) => {
            return (
              <tr>
                <td>{i}P</td>
                <td>{e[0] === null ? "Infinity" : `(${e[0]},${e[1]})`}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </section>
  );
};
export default ECC;
