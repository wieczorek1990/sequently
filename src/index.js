
"use strict";

export default {
  sequence: function (functions, args) {
    let function_args;
    let function_primes = [];
    let incrementers = [];
    let prime_index = 0;

    if (!Array.isArray(args)) {
        function_args = Array(functions.length).fill([]);
    } else {
        function_args = args;
    }

    for (let index = 0; index < functions.length; index += 1) {
      let incrementer = function () {
        prime_index += 1;
        function_primes[prime_index](incrementers[prime_index]);
      };

      incrementers.push(incrementer);

      let function_prime = function (callback) {
        if (function_args[prime_index].length === 0) {
          functions[prime_index](callback);
        } else {
          functions[prime_index](function_args[prime_index], callback);
        }
      };

      function_primes.push(function_prime);
    }

    function_primes[0](incrementers[0], function_args[0]);
  }
}
