import { createRenderer } from 'fela-native'
import felaSanitizeCss from './felaSanitizeCssPlugin'
// import felaPluginFallbackValue from 'fela-plugin-fallback-value'
// import felaPluginPlaceholderPrefixer from 'fela-plugin-placeholder-prefixer'
// import felaPluginPrefixer from 'fela-plugin-prefixer'
import rtl from 'fela-plugin-rtl'

import { Renderer } from '../themes/types'

const __DEV__ = true

const createRendererConfig = (options: any = {}) => ({
  plugins: [
    // is necessary to prevent accidental style typos
    // from breaking ALL the styles on the page
    felaSanitizeCss({
      skip: ['content'],
    }),

    // felaPluginPlaceholderPrefixer(),
    // felaPluginPrefixer(),

    // Heads up!
    // This is required after fela-plugin-prefixer to resolve the array of fallback values prefixer produces.
    // felaPluginFallbackValue(),
    ...(options.isRtl ? [rtl()] : []),
  ],
  enhancers: [],
  ...(options.isRtl ? { selectorPrefix: 'rtl_' } : {}),
})

export const felaRenderer: Renderer = createRenderer(createRendererConfig())
export const felaRtlRenderer: Renderer = createRenderer(createRendererConfig({ isRtl: true }))

export default felaRenderer

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
    let nextSource = arguments[nextIndex]
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

    for (let key in nextSource) {
      if (__DEV__) {
        let hasOwnProperty = Object.prototype.hasOwnProperty
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
