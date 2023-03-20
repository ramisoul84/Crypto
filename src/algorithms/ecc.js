// Inverse Modulo
function modInverse(a, m) {
  // validate inputs
  [a, m] = [Number(a), Number(m)];
  if (Number.isNaN(a) || Number.isNaN(m)) {
    return NaN; // invalid input
  }
  a = ((a % m) + m) % m;
  if (!a || m < 2) {
    return NaN; // invalid input
  }
  // find the gcd
  const s = [];
  let b = m;
  while (b) {
    [a, b] = [b, a % b];
    s.push({ a, b });
  }
  if (a !== 1) {
    return NaN; // inverse does not exists
  }
  // find the inverse
  let x = 1;
  let y = 0;
  for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
  }
  return ((y % m) + m) % m;
}
// check if a point on curve
const isOnCurve = (point, a, b, p) => {
  const x = point[0];
  const y = point[1];
  return (y * y - x * x * x - a * x - b) % p === 0;
};
// Add two points
const addPoints = (P, Q, a, b, p) => {
  let R = [null, null];
  let m;
  if (P[0] === null && P[1] === null) {
    R = [Q[0], Q[1]];
  } else if (Q[0] === null && Q[1] === null) {
    R = [P[0], P[1]];
  } else if (P[0] === Q[0] && P[1] !== Q[1]) {
    R = [null, null];
  } else if (P[0] === Q[0] && P[1] === Q[1]) {
    m = (3 * P[0] * P[0] + a) * modInverse(2 * P[1], p);
    R[0] = (m * m - P[0] - Q[0]) % p;
    R[1] = (m * (Q[0] - R[0]) - Q[1]) % p;
  } else {
    m = (Q[1] - P[1]) * modInverse(Q[0] - P[0], p);
    R[0] = (m * m - P[0] - Q[0]) % p;
    R[1] = (m * (Q[0] - R[0]) - Q[1]) % p;
  }
  R[0] = R[0] < 0 ? R[0] + p : R[0]; // if negative add p
  R[1] = R[1] < 0 ? R[1] + p : R[1];
  console.log(R[0]);
  return isOnCurve(R, a, b, p) ? R : [null, null];
};
/*
const addPoints = (P, Q, a, b, p) => {
  let R = { x: null, y: null };
  let m;
  if (P.x === null && P.y === null) {
    R = { x: Q.x, y: Q.y };
  } else if (Q.x === null && Q.y === null) {
    R = { x: P.x, y: P.y };
  } else if (P.x === Q.x && P.y !== Q.y) {
    R = { x: null, y: null };
  } else if (P.x === Q.x && P.y === Q.y) {
    m = (3 * P.x * P.x + a) * modInverse(2 * P.y, p);
    R.x = (m * m - P.x - Q.x) % p;
    R.y = (m * (Q.x - R.x) - Q.y) % p;
  } else {
    m = (Q.y - P.y) * modInverse(Q.x - P.x, p);
    R.x = (m * m - P.x - Q.x) % p;
    R.y = (m * (Q.x - R.x) - Q.y) % p;
  }
  R.x = R.x < 0 ? R.x + p : R.x; // if negative add p
  R.y = R.y < 0 ? R.y + p : R.y;
  return isOnCurve(R) ? R : { x: null, y: null };
};
*/
// find all points that ocated on curve
const pointsGen = (a, b, p) => {
  [a, b, p] = [Number(a), Number(b), Number(p)];
  //const prime = p <= 50 ? p : 50;
  let points = [];
  for (let x = 0; x < p; x++) {
    for (let y = 0; y < p; y++) {
      if ((x * x * x + a * x + b - y * y) % p === 0) {
        points.push([x, y]);
      }
    }
  }
  return points;
};

const multPoint = (point, k, a, b, p) => {
  [a, b, p] = [Number(a), Number(b), Number(p)];
  const points = [];
  points.push([null, null]);
  points.push(point);
  points.push(addPoints(points[1], point, a, b, p));
  for (let i = 3; i <= k; i++) {
    points.push(addPoints(points[1], points[i - 1], a, b, p));
  }
  return points;
};

export { pointsGen, multPoint };

let a = 0;
let b = 7;
let p = 17;
console.log(pointsGen(a, b, p));
console.log(multPoint([15, 13], 20, a, b, p));
