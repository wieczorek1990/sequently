'use strict'

export default {
  sequence: function (functions, args) {
    let functionArgs
    let functionPrimes = []
    let incrementers = []
    let primeIndex = 0

    if (!Array.isArray(args)) {
      functionArgs = Array(functions.length).fill([])
    } else {
      functionArgs = args
    }

    for (let index = 0; index < functions.length; index += 1) {
      let incrementer = function () {
        primeIndex += 1
        functionPrimes[primeIndex](incrementers[primeIndex])
      }

      incrementers.push(incrementer)

      let functionPrime = function (callback) {
        if (functionArgs[primeIndex].length === 0) {
          functions[primeIndex](callback)
        } else {
          functions[primeIndex](functionArgs[primeIndex], callback)
        }
      }

      functionPrimes.push(functionPrime)
    }

    functionPrimes[0](incrementers[0], functionArgs[0])
  }
}
