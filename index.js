module.exports = {
  sequence: function (functions_array) {
    var functions;

    if (Array.isArray(functions_array)) {
      functions = functions_array;
    } else {
      functions = arguments;
    }

    var function_primes = [];
    var incrementers = [];
    var prime_index = 0;

    for (var index = 0; index < functions.length; index += 1) {
      var incrementer = function () {
        prime_index += 1;
        function_primes[prime_index](incrementers[prime_index]);
      }
      incrementers.push(incrementer);

      var function_prime = function (callback) {
        functions[prime_index](callback);
      }
     function_primes.push(function_prime);
    }

    function_primes[0](incrementers[0]);
  }
}

