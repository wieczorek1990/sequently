Sequently
=========

Library for running asynchronous functions sequentially using callbacks.

## Examples

```javascript
import Sequently from './dist/sequently.js';

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

Sequently.sequence([a, b, c]);


function d(args, callback) {
    console.log('d');
    console.log(args);
    callback();
}

function e(args, callback) {
    console.log('e');
    console.log(args);
    callback();
}

function f(args) {
    console.log('f');
    console.log(args);
}

Sequently.sequence([d, e, f], [[1], [2], [3]]);
```
