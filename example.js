sequently = require('./index.js')

function a(callback) {
  console.log('a');
  callback();
}

function b(callback) {
  console.log('b');
  callback();
}

function c() {
  console.log('c');
}

sequently.sequence(a, b, c);
console.log();
sequently.sequence([a, b, c]);

