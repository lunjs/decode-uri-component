const UTF8_ACCEPT = 0;
const UTF8_REJECT = 12;

const UTF8_DATA_TYPE = [
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,
  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,
  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,
  4,  4,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,
  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,
  6,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  8,  7,  7,
  9,  10, 10, 10, 11, 4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4
];

const UTF8_DATA_STATE = [
  0,  12, 12, 12, 12, 13, 26, 39, 52, 65,
  78, 91, 12, 12, 0,  0,  0,  12, 12, 12,
  12, 12, 12, 12, 12, 12, 12, 12, 12, 13,
  12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
  13, 13, 13, 12, 12, 12, 12, 12, 12, 12,
  12, 12, 12, 13, 13, 12, 12, 12, 12, 12,
  12, 12, 12, 12, 12, 12, 12, 39, 39, 12,
  12, 12, 12, 12, 12, 12, 12, 12, 12, 39,
  39, 39, 12, 12, 12, 12, 12, 12, 12, 12,
  12, 12, 39, 12, 12, 12, 12, 12, 12, 12,
  12, 12, 12, 12
];

const UTF8_DATA_MASK = [
  0x7F, 0x3F, 0x3F, 0x3F, 0x00, 0x1F, 0x0F, 0x0F, 0x0F, 0x07, 0x07, 0x07
];

const HEX = {
  '48': 0,
  '49': 1,
  '50': 2,
  '51': 3,
  '52': 4,
  '53': 5,
  '54': 6,
  '55': 7,
  '56': 8,
  '57': 9,
  '65': 10,
  '66': 11,
  '67': 12,
  '68': 13,
  '69': 14,
  '70': 15,
  '97': 10,
  '98': 11,
  '99': 12,
  '100': 13,
  '101': 14,
  '102': 15
};

function hexCodeToInt(c, shift) {
  const i = HEX[c];
  return i === undefined ? 255 : i << shift;
}

let fromCodePoint = String.fromCodePoint;
if (!fromCodePoint) {
  fromCodePoint = (c) => {
    return (c <= 0xFFFF)
      ? String.fromCharCode(c)
      : String.fromCharCode((0xD7C0 + (c >> 10)), (0xDC00 + (c & 0x3FF)));
  }
}

function decodeURIComponent(encodedURI) {
  let p = encodedURI.indexOf('%');
  if (p === -1) {
    return encodedURI;
  }

  const len = encodedURI.length;
  let decoded = '';
  let last = 0;
  let codepoint = 0;
  let startOfOctets = p;
  let state = UTF8_ACCEPT;

  while (p > -1 && p < len) {
    const high = hexCodeToInt(encodedURI.charCodeAt(p + 1), 4);
    const low = hexCodeToInt(encodedURI.charCodeAt(p + 2), 0);
    const byte = high | low;
    const type = UTF8_DATA_TYPE[byte];
    state = UTF8_DATA_STATE[state + type];
    codepoint = (codepoint << 6) | (byte & UTF8_DATA_MASK[type]);

    if (state === UTF8_ACCEPT) {
      decoded += encodedURI.substring(last, startOfOctets);
      decoded += fromCodePoint(codepoint);

      codepoint = 0;
      last = p + 3;
      p = startOfOctets = encodedURI.indexOf('%', last);

    } else if (state === UTF8_REJECT) {
      return null;

    } else {
      p += 3;
      if (p < len && encodedURI.charCodeAt(p) === 37) {
        continue;
      }
      return null;
    }
  }

  return decoded + encodedURI.substring(last);
}

module.exports = {
  decodeURIComponent
};
