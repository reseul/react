import { AppRegistry } from 'react-native'

// Polypolyfill the __assign so we allow "falsy" elements
const __DEV__ = true

Object.assign = function (target, sources) {
  if (__DEV__) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined')
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
      throw new TypeError(
        'In this environment the target of assign MUST be an object. ' +
          'This error is a performance optimization and not spec compliant.',
      )
    }
  }

  for (let nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    const nextSource = arguments[nextIndex]
    if (nextSource == null || nextSource === false) {
      continue
    }

    if (__DEV__) {
      if (typeof nextSource !== 'object' && typeof nextSource !== 'function') {
        throw new TypeError(
          'In this environment the sources for assign MUST be an object. ' +
            'This error is a performance optimization and not spec compliant.',
        )
      }
    }

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects.

    for (const key in nextSource) {
      if (__DEV__) {
        const hasOwnProperty = Object.prototype.hasOwnProperty
        if (!hasOwnProperty.call(nextSource, key)) {
          throw new TypeError(
            'One of the sources for assign has an enumerable key on the ' +
              'prototype chain. Are you trying to assign a prototype property? ' +
              "We don't allow it, as this is an edge case that we do not support. " +
              'This error is a performance optimization and not spec compliant.',
          )
        }
      }
      target[key] = nextSource[key]
    }
  }

  return target
}





import App from './App'

AppRegistry.registerComponent('Simple', () => App)
