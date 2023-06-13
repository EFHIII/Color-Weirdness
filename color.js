function colorlRGB({r, g, b}) {
  return `rgb(${Math.floor(gammaCorrect(r) * 255)},${Math.floor(gammaCorrect(g) * 255)},${Math.floor(gammaCorrect(b) * 255)})`;
}

function colorRGB({r, g, b}) {
  return `rgb(${Math.floor(r * 255)},${Math.floor(g * 255)},${Math.floor(b * 255)})`;
}

function r(a, m, b) {
  return (m - a) / (b - a);
}

const colorMatch = [
  [0.0014, 0.0000, 0.0065],
  [0.0022, 0.0001, 0.0105],
  [0.0042, 0.0001, 0.0201],
  [0.0076, 0.0002, 0.0362],
  [0.0143, 0.0004, 0.0679],
  [0.0232, 0.0006, 0.1102],
  [0.0435, 0.0012, 0.2074],
  [0.0776, 0.0022, 0.3713],
  [0.1344, 0.0040, 0.6456],
  [0.2148, 0.0073, 1.0391],
  [0.2839, 0.0116, 1.3856],
  [0.3285, 0.0168, 1.6230],
  [0.3483, 0.0230, 1.7471],
  [0.3481, 0.0298, 1.7826],
  [0.3362, 0.0380, 1.7721],
  [0.3187, 0.0480, 1.7441],
  [0.2908, 0.0600, 1.6692],
  [0.2511, 0.0739, 1.5281],
  [0.1954, 0.0910, 1.2876],
  [0.1421, 0.1126, 1.0419],
  [0.0956, 0.1390, 0.8130],
  [0.0580, 0.1693, 0.6162],
  [0.0320, 0.2080, 0.4652],
  [0.0147, 0.2586, 0.3533],
  [0.0049, 0.3230, 0.2720],
  [0.0024, 0.4073, 0.2123],
  [0.0093, 0.5030, 0.1582],
  [0.0291, 0.6082, 0.1117],
  [0.0633, 0.7100, 0.0782],
  [0.1096, 0.7932, 0.0573],
  [0.1655, 0.8620, 0.0422],
  [0.2257, 0.9149, 0.0298],
  [0.2904, 0.9540, 0.0203],
  [0.3597, 0.9803, 0.0134],
  [0.4334, 0.9950, 0.0087],
  [0.5121, 1.0000, 0.0057],
  [0.5945, 0.9950, 0.0039],
  [0.6784, 0.9786, 0.0027],
  [0.7621, 0.9520, 0.0021],
  [0.8425, 0.9154, 0.0018],
  [0.9163, 0.8700, 0.0017],
  [0.9786, 0.8163, 0.0014],
  [1.0263, 0.7570, 0.0011],
  [1.0567, 0.6949, 0.0010],
  [1.0622, 0.6310, 0.0008],
  [1.0456, 0.5668, 0.0006],
  [1.0026, 0.5030, 0.0003],
  [0.9384, 0.4412, 0.0002],
  [0.8544, 0.3810, 0.0002],
  [0.7514, 0.3210, 0.0001],
  [0.6424, 0.2650, 0.0000],
  [0.5419, 0.2170, 0.0000],
  [0.4479, 0.1750, 0.0000],
  [0.3608, 0.1382, 0.0000],
  [0.2835, 0.1070, 0.0000],
  [0.2187, 0.0816, 0.0000],
  [0.1649, 0.0610, 0.0000],
  [0.1212, 0.0446, 0.0000],
  [0.0874, 0.0320, 0.0000],
  [0.0636, 0.0232, 0.0000],
  [0.0468, 0.0170, 0.0000],
  [0.0329, 0.0119, 0.0000],
  [0.0227, 0.0082, 0.0000],
  [0.0158, 0.0057, 0.0000],
  [0.0114, 0.0041, 0.0000],
  [0.0081, 0.0029, 0.0000],
  [0.0058, 0.0021, 0.0000],
  [0.0041, 0.0015, 0.0000],
  [0.0029, 0.0010, 0.0000],
  [0.0020, 0.0007, 0.0000],
  [0.0014, 0.0005, 0.0000],
  [0.0010, 0.0004, 0.0000],
  [0.0007, 0.0002, 0.0000],
  [0.0005, 0.0002, 0.0000],
  [0.0003, 0.0001, 0.0000],
  [0.0002, 0.0001, 0.0000],
  [0.0002, 0.0001, 0.0000],
  [0.0001, 0.0000, 0.0000],
  [0.0001, 0.0000, 0.0000],
  [0.0001, 0.0000, 0.0000],
  [0.0000, 0.0000, 0.0000]
];

function wavelengthToXyz(wavelength) {
  if(wavelength < 380 || wavelength > 780) {
    return {
      x: 0,
      y: 0,
      z: 0
    };
  }

  const i = (wavelength - 380) / 5;

  const m = i % 1;

  const a = colorMatch[Math.floor(i)];
  const b = colorMatch[Math.ceil(i)];

  return {
    x: a[0] * (1 - m) + b[0] * m,
    y: a[1] * (1 - m) + b[1] * m,
    z: a[2] * (1 - m) + b[2] * m,
  };
}

function gammaCorrect(v) {
  return (v <= 0.0031308) ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

function inverseGammaCorrect(v) {
  return (v <= 0.040449936) ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function rgbToHsl({r, g, b}) {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h, s, l };
}

function hue2rgb(p, q, t) {
  t = t % 1;
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

function hslToRgb({h, s, l}) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r, g, b };
}

function hslToThsl({h, s, l}) {
  return {
    x: Math.cos(h * Math.PI * 2) * s,
    y: l,
    z: Math.sin(h * Math.PI * 2) * s,
  };
}

function thslToHsl({x, y, z}) {
  return {
    h: (1 + Math.atan2(z, x) / Math.PI / 2) % 1,
    s: Math.sqrt(x * x + z * z),
    l: y,
  };
}

function rgbToHsv({r, g, b}) {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, v = max;

  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h, s, v };
}

function hsvToRgb({h, s, v}) {
  let r, g, b;

  let i = Math.floor((h % 1) * 6);
  let f = (h % 1) * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return { r, g, b };
}

function hsvToThsv({h, s, v}) {
  return {
    x: Math.cos(h * Math.PI * 2) * s,
    y: v,
    z: Math.sin(h * Math.PI * 2) * s,
  };
}

function thsvToHsv({x, y, z}) {
  return {
    h: (1 + Math.atan2(z, x) / Math.PI / 2) % 1,
    s: Math.sqrt(x * x + z * z),
    v: y,
  };
}

function rgbToXyz({r, g, b}) {
  // Convert the linear sRGB values to CIE XYZ
  return {
    x: r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
    y: r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
    z: r * 0.0193339 + g * 0.1191920 + b * 0.9503041,
  }
}

function xyzToRgb({x, y, z}) {
  const r = 3.2406255 * x + -1.537208 * y + -0.4986286 * z;
  const g = -0.9689307 * x + 1.8757561 * y + 0.0415175 * z;
  const b = 0.0557101 * x + -0.2040211 * y + 1.0569959 * z;

  return {
    r: Math.max(0, Math.min(1, r)),
    g: Math.max(0, Math.min(1, g)),
    b: Math.max(0, Math.min(1, b)),
  };
}

function xyzToLab({
  x,
  y,
  z
}) {
  // Convert CIE XYZ to CIE L*a*b*
  const Xn = 95.047;
  const Yn = 100;
  const Zn = 108.883;
  const f = (t) => ((t > 0.008856) ? Math.pow(t, 1 / 3) : (t / 0.128418 + 16 / 116));
  return {
    l: 116 * f(y / Yn) - 16,
    a: 500 * (f(x / Xn) - f(y / Yn)),
    b: 200 * (f(y / Yn) - f(z / Zn)),
  };
}

function labToXyz({
  l,
  a,
  b
}) {
  // Convert CIE *L*a*b color to CIE XYZ
  const Xn = 95.047;
  const Yn = 100;
  const Zn = 108.883;
  const f = (t) => ((t > 6 / 29) ? Math.pow(t, 3) : (0.128418 * (t - 4 / 29)));

  return {
    x: Xn * f((l + 16) / 116 + a / 500),
    y: Yn * f((l + 16) / 116),
    z: Zn * f((l + 16) / 116 - b / 200)
  };
}

function wavelengthToRgb(wavelength) {
  return xyzToRgb(wavelengthToXyz(wavelength));
}

function parseColor(colorString) {
  if(colorString[0] === '#') {
    return {
      r: parseInt(colorString.slice(1, 3), 16) / 255,
      g: parseInt(colorString.slice(3, 5), 16) / 255,
      b: parseInt(colorString.slice(5), 16) / 255,
      a: 1
    };
  }
  else {
    let colors = colorString.slice(5, -1).split(',');
    return {
      r: colors[0] / 255,
      g: colors[1] / 255,
      b: colors[2] / 255,
      a: colors[3] * 1
    };
  }
}
