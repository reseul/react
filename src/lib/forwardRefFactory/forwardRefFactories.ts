// @ts-ignore TODO: resolve import issue
import * as hoistNonReactStatics from 'hoist-non-react-statics'
import * as React from 'react'

import Ref from '../../components/Ref/Ref'
import { supportsRef } from './componentUtils'
import * as _ from 'lodash'

/**
 * Use just a string for now (react 16.6), since React doesn't support Symbols in props yet.
 * @see https://github.com/facebook/react/issues/7552
 */
export const forwardRefSymbol = '__forwardRef__'

/**
 * Creates a function that will choose how to pass a ref.
 * @param Component A component to wrap.
 */
export const forwardFunctionFactory = <C extends React.ComponentType<P>, P extends { as?: any }>(
  Component: C,
) => (props: P, ref: React.Ref<C>) => {
  // TODO: Make correct comment
  // The most simple case when `as='div'`
  // This component supports ref forwarding!
  // Magic happens there!
  if (!props.as || supportsRef(props.as)) {
    return React.createElement(Component, Object.assign({}, props, { [forwardRefSymbol]: ref }))
  }

  // TODO: Make correct comment
  // Need to get ref manually
  return React.createElement(Ref, {
    // TODO: Resolve type error there
    children: React.createElement(Component, props as any),
    innerRef: ref,
  })
}

/**
 * Wraps a passed component with React.forwardRef() which produce a new component. Also assigns (hoists) static methods
 * of a passed component to a result component.
 * @param Component A component to wrap with forwardRef()
 */
export function forwardRefFactory<C extends React.ComponentType<P>, P extends { as?: any }>(
  Component: C,
): C {
  const componentFactory = forwardFunctionFactory(Component)
  const ForwardedComponent = React.forwardRef<C>(componentFactory)

  return hoistNonReactStatics(ForwardedComponent, Component) as C
}

/**
 * Wraps a passed component with React.forwardRef(), will warn a user about an unsupported `ref` prop.
 * @param Component A component to wrap with forwardRef()
 */
export const noForwardRefFactory = <C extends React.ComponentType<P>, P>(Component: C): C => {
  // Heads up!
  // We use memoization to avoid tons of warnings.
  const noRefSupport = _.memoize((show: boolean) => {
    if (show) {
      console.warn('Stardust UI: a "ref" prop is not supported by this component.')
    }

    return show
  })

  const ForwardedComponent = React.forwardRef<C>((props, ref) => {
    if (process.env.NODE_ENV !== 'production') {
      noRefSupport(!!ref)
    }

    // TODO: Resolve type error there
    return React.createElement(Component, props as any)
  })

  return hoistNonReactStatics(ForwardedComponent, Component) as C
}
