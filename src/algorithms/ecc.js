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

const isOnCurve = (point) => {
  const x = point.x;
  const y = point.y;
  return (y * y - x * x * x - curve.a * x - curve.b) % curve.p === 0;
};

const addPoints = (P, Q) => {
  let R = { x: null, y: null };
  let m;
  if (P.x === null && P.y === null) {
    R = { x: Q.x, y: Q.y };
  } else if (Q.x === null && Q.y === null) {
    R = { x: P.x, y: P.y };
  } else if (P.x === Q.x && P.y !== Q.y) {
    R = { x: null, y: null };
  } else if (P.x === Q.x && P.y === Q.y) {
    m = (3 * P.x * P.x + curve.a) * modInverse(2 * P.y, curve.p);
    R.x = (m * m - P.x - Q.x) % curve.p;
    R.y = (m * (Q.x - R.x) - Q.y) % curve.p;
  } else {
    m = (Q.y - P.y) * modInverse(Q.x - P.x, curve.p);
    R.x = (m * m - P.x - Q.x) % curve.p;
    R.y = (m * (Q.x - R.x) - Q.y) % curve.p;
  }

  R.x = R.x <= 0 ? R.x + curve.p : R.x; // if negative add p
  R.y = R.y <= 0 ? R.y + curve.p : R.y;
  R.y = R.y === curve.p ? 0 : R.y; // if  p return 0
  R.x = R.x === curve.p ? 0 : R.x;
  console.log(`P(${P.x},${P.y})+Q(${Q.x},${Q.y})=R(${R.x},${R.y})`);
  return isOnCurve(R) ? R : { x: null, y: null };
};

const pointsGen1 = (a, b, p) => {
  let points = [];
  let point = { x: null, y: null };
  let count = 0;
  for (let x = 0; x < p; x++) {
    for (let y = 0; y < p; y++) {
      let point = { x: x, y: y };
      if ((x * x * x + a * x + b - y * y) % p === 0) {
        points.push(point);
        count++;
      }
    }
  }
  console.log(count);
  return points;
};
const pointsGen = (a, b, p) => {
  let points = [];
  let count = 0;
  for (let x = 0; x < p; x++) {
    for (let y = 0; y < p; y++) {
      if ((x * x * x + a * x + b - y * y) % p === 0) {
        points.push([x, y]);
        count++;
      }
    }
  }
  console.log(count);
  return points;
};

const multPoint = (point, k) => {
  const x = point.x;
  const y = point.y;
  const points = [];
  points.push(point);
  points.push(addPoints(points[0], point));
  for (let i = 2; i < k; i++) {
    points.push(addPoints(points[0], points[i - 1]));
  }
  return points;
};

const curve = {
  a: 0,
  b: 7,
  p: 17,
};
const xx = pointsGen(0, 7, 17);
console.log(xx);

//let R = addPoints({ x: 6, y: 1 }, { x: 8, y: 1 });
//nsole.log(`R(${R.x},${R.y})`);

export { pointsGen };
console.log("hi");
