import { forwardRefSymbol } from './forwardRefFactory/forwardRefFactories'

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
const getUnhandledProps = (Component, props) => {
  // TODO: Add argument type
  const { handledProps = [] } = Component

  return Object.keys(props).reduce((acc, prop) => {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]
    if (prop === forwardRefSymbol) {
      // @ts-ignore TODO: HEHE, WE NEED TO SOLVE THIS
      acc.ref = props[forwardRefSymbol]
    }

    return acc
  }, {})
}

export default getUnhandledProps
