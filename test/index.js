'use strict'

import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import seq from '../src/index.js'

describe('sequence', () => {
  it('executes functions in order', () => {
    return new Promise((resolve, reject) => {
      const order = []
      seq.sequence([
        (cb) => { order.push(1); cb() },
        (cb) => { order.push(2); cb() },
        (cb) => { order.push(3); cb() }
      ])
      // Allow async callbacks to complete
      setTimeout(() => {
        try {
          assert.deepEqual(order, [1, 2, 3])
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('passes arguments to functions when args array is provided', () => {
    return new Promise((resolve, reject) => {
      const results = []
      seq.sequence([
        (args, cb) => { results.push(args[0]); cb() },
        (args, cb) => { results.push(args[0]); cb() }
      ], [[10], [20]])
      setTimeout(() => {
        try {
          assert.deepEqual(results, [10, 20])
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('calls functions with no arguments when args is not an array', () => {
    return new Promise((resolve, reject) => {
      const results = []
      seq.sequence([
        (cb) => { results.push('a'); cb() },
        (cb) => { results.push('b'); cb() }
      ], 'not-an-array')
      setTimeout(() => {
        try {
          assert.deepEqual(results, ['a', 'b'])
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('handles a single function without throwing', () => {
    return new Promise((resolve, reject) => {
      let called = false
      seq.sequence([
        (cb) => { called = true; cb() }
      ])
      setTimeout(() => {
        try {
          assert.equal(called, true)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('handles empty function array', () => {
    return new Promise((resolve, reject) => {
      // Should not throw
      seq.sequence([])
      setTimeout(() => {
        resolve()
      }, 10)
    })
  })

  it('passes callback as second argument when no args provided', () => {
    return new Promise((resolve, reject) => {
      const results = []
      seq.sequence([
        (cb) => { results.push('a'); cb() },
        (cb) => { results.push('b'); cb() }
      ])
      setTimeout(() => {
        try {
          assert.deepEqual(results, ['a', 'b'])
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('handles multiple functions with varying arg lengths', () => {
    return new Promise((resolve, reject) => {
      const results = []
      seq.sequence([
        (args, cb) => { results.push(args[0] + args[1]); cb() },
        (args, cb) => { results.push(args[0]); cb() },
        (cb) => { results.push('done'); cb() }
      ], [[1, 2], [3], []])
      setTimeout(() => {
        try {
          assert.deepEqual(results, [3, 3, 'done'])
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('does not throw TypeError on last function callback (bounds check)', () => {
    return new Promise((resolve, reject) => {
      let lastCalled = false
      // This was the bug: the last function's callback would increment primeIndex
      // beyond the array length and try to call undefined as a function
      seq.sequence([
        (cb) => { cb() },
        (cb) => { lastCalled = true; cb() }
      ])
      setTimeout(() => {
        try {
          assert.equal(lastCalled, true)
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('handles short args array without throwing', () => {
    return new Promise((resolve, reject) => {
      const results = []
      // Only 1 args entry for 3 functions — missing entries should default to []
      seq.sequence([
        (args, cb) => { results.push(args[0]); cb() },
        (cb) => { results.push('no-args'); cb() },
        (cb) => { results.push('no-args'); cb() }
      ], [[42]])
      setTimeout(() => {
        try {
          assert.deepEqual(results, [42, 'no-args', 'no-args'])
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 10)
    })
  })

  it('handles null functions parameter without throwing', () => {
    return new Promise((resolve, reject) => {
      // Should not throw
      assert.doesNotThrow(() => {
        seq.sequence(null)
      })
      setTimeout(() => {
        resolve()
      }, 10)
    })
  })

  it('handles non-array functions parameter without throwing', () => {
    return new Promise((resolve, reject) => {
      // Should not throw
      assert.doesNotThrow(() => {
        seq.sequence('not-an-array')
      })
      setTimeout(() => {
        resolve()
      }, 10)
    })
  })
})
