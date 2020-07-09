const { decodeURIComponent: lunjsDecodeURIComponent } = require('./');
const fastDecodeURIComponent = require('fast-decode-uri-component');

const short = encodeURIComponent('tést💩🇺🇸');
const medium = short.repeat(500);
const long = medium.repeat(500);

console.time('Short String (native)')
for (let i = 0; i < 100000; i++) {
  decodeURIComponent(short);
}
console.timeEnd('Short String (native)')

console.time('Short String (lunjs)')
for (let i = 0; i < 100000; i++) {
  lunjsDecodeURIComponent(short);
}
console.timeEnd('Short String (lunjs)')

console.time('Short String (fast)')
for (let i = 0; i < 100000; i++) {
  fastDecodeURIComponent(short);
}
console.timeEnd('Short String (fast)')


console.time('Medium String (native)')
for (let i = 0; i < 10000; i++) {
  decodeURIComponent(medium);
}
console.timeEnd('Medium String (native)')

console.time('Medium String (lunjs)')
for (let i = 0; i < 10000; i++) {
  lunjsDecodeURIComponent(medium);
}
console.timeEnd('Medium String (lunjs)')

console.time('Medium String (fast)')
for (let i = 0; i < 10000; i++) {
  fastDecodeURIComponent(medium);
}
console.timeEnd('Medium String (fast)')


console.time('Long String (native)')
for (let i = 0; i < 10; i++) {
  decodeURIComponent(long);
}
console.timeEnd('Long String (native)')

console.time('Long String (lunjs)')
for (let i = 0; i < 10; i++) {
  lunjsDecodeURIComponent(long);
}
console.timeEnd('Long String (lunjs)')

console.time('Long String (fast)')
for (let i = 0; i < 10; i++) {
  fastDecodeURIComponent(long);
}
console.timeEnd('Long String (fast)')