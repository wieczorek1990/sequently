sequently
=========

Library for running asynchronous functions sequentially using callbacks.

## Example usage

```javascript
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

sequently.sequence([a, b, c]);


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

sequently.sequence([d, e, f], [[1], [2], [3]]);
```
