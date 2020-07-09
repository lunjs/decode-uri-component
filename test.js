const assert = require('assert');
const { decodeURIComponent } = require('.');

function test(from, to) {
  for (let code = from; code < to; code++) {
    const str = String.fromCodePoint(code);
    const str2 = decodeURIComponent(encodeURIComponent(str));
    assert.strictEqual(str2, str);
  }
}

console.info('test start');

test(0x0000, 0xD800);
test(0xE000, 0x10FFFF);

console.info('test done');