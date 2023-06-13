let gausTable = [];

function getVoid(a, b, size) {
  let besti = [0, 0];
  let best = Infinity;
  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      if(a[x][y] === 1) {
        if(b[x][y] < best) {
          best = b[x][y];
          besti = [x, y];
        }
      }
    }
  }
  return besti;
}

function getCluster(a, b, size) {
  let besti = [0, 0];
  let best = -Infinity;
  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      if(a[x][y] === 0) {
        if(b[x][y] > best) {
          best = b[x][y];
          besti = [x, y];
        }
      }
    }
  }
  return besti;
}

function addPoint(a, b, x, y, size) {
  a[x][y] = 0;
  for(let X = -size / 2; X < size / 2; X++) {
    for(let Y = -size / 2; Y < size / 2; Y++) {
      b[(size + x + X) % size][(size + y + Y) % size] += gausTable[Math.abs(X)][Math.abs(Y)];
    }
  }
}

function subPoint(a, b, x, y, size) {
  a[x][y] = 1;
  for(let X = -size / 2; X < size / 2; X++) {
    for(let Y = -size / 2; Y < size / 2; Y++) {
      b[(size + x + X) % size][(size + y + Y) % size] -= gausTable[Math.abs(X)][Math.abs(Y)];
    }
  }
}

function getScore(a, b, size) {
  let mean = 0;
  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      mean += b[x][y];
    }
  }
  mean /= size * size;

  let s = 0;
  for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
      s += (b[x][y] - mean) ** 2;
    }
  }

  // rounding a little helps get around acumulated floating-point error
  return Math.floor(Math.sqrt(s / (size * size)) * 1e8) / 1e8;
}

function ditherArray(size, p) {
  gausTable = [];
  for(let x = 0; x < size; x++) {
    gausTable.push([]);
    for(let y = 0; y < size; y++) {
      gausTable[x][y] = Math.pow(Math.E, -Math.sqrt(x * x + y * y) / 4.5);
    }
  }

  let a = new Array(size).fill().map(_ => new Array(size).fill(1));
  let b = new Array(size).fill().map(_ => new Array(size).fill(0));
  let da = new Array(size).fill().map(_ => new Array(size).fill(0));

  // create a starting bitmap
  for(let i = 0; i < p; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    } while(!a[x][y]);
    addPoint(a, b, x, y, size);
  }

  // even out the points in the starting bitmap
  let score;
  let newScore = getScore(a, b, size);
  do {
    score = newScore;
    let best = Infinity,
      besti = [0, 0];
    for(let x = 0; x < size; x++) {
      for(let y = 0; y < size; y++) {
        if(a[x][y] === 0) {
          subPoint(a, b, x, y, size);
          let cl = getCluster(a, b, size);
          subPoint(a, b, cl[0], cl[1], size);
          let vd1 = getVoid(a, b, size);
          addPoint(a, b, vd1[0], vd1[1], size);
          let vd2 = getVoid(a, b, size);
          addPoint(a, b, vd2[0], vd2[1], size);
        }
      }
    }
    newScore = getScore(a, b, size);
  } while(newScore < score);

  // create the dither array
  let bpa = JSON.parse(JSON.stringify(a));
  let bpb = JSON.parse(JSON.stringify(b));

  let rank = p - 1;
  while(rank >= 0) {
    let cl = getCluster(bpa, bpb, size);
    subPoint(bpa, bpb, cl[0], cl[1], size);
    da[cl[0]][cl[1]] = rank;
    rank--;
  }

  bpa = JSON.parse(JSON.stringify(a));
  bpb = JSON.parse(JSON.stringify(b));

  rank = p;
  while(rank < size * size) {
    let vd = getVoid(bpa, bpb, size);
    addPoint(bpa, bpb, vd[0], vd[1], size);
    da[vd[0]][vd[1]] = rank;
    rank++;
  }

  return da;
}

console.log(ditherArray(64, 64).map(a => a.join(', ')).join('],\n['));
