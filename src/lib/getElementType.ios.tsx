import { ReactType } from 'react'
import * as RN from 'react-native'
import { Props } from '../../types/utils'

function getElementTypeHelper(
  Component: { defaultProps?: Props },
  props: Props,
  getDefault?: () => ReactType,
): ReactType {
  const { defaultProps = {} } = Component

  // ----------------------------------------
  // user defined "as" element type

  if (props.as && props.as !== defaultProps.as) return props.as

  // ----------------------------------------
  // computed default element type

  if (getDefault) {
    const computedDefault = getDefault()
    if (computedDefault) return computedDefault
  }

  // ----------------------------------------
  // infer anchor links

  if (props.href) return RN.Text

  // ----------------------------------------
  // use defaultProp or 'div'

  return defaultProps.as || 'div'
}

/**
 * Returns a createElement() type based on the props of the Component.
 * Useful for calculating what type a component should render as.
 *
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @param {function} [getDefault] A function that returns a default element type.
 * @returns {string|function} A ReactElement type
 */
function getElementType(
  Component: { defaultProps?: Props },
  props: Props,
  getDefault?: () => ReactType,
): ReactType {

  var elementType = getElementTypeHelper(Component, props, getDefault)
  if (elementType === 'div') {
    elementType = RN.View
  } else if (elementType === 'input') {
    elementType = RN.TextInput
  } else if (elementType === 'button') {
    elementType = RN.View
  } else if (elementType === 'span') {
    elementType = RN.Text
  } else if (elementType === 'p') {
    elementType = RN.Text
  } else if (elementType === 'h1') {
    elementType = RN.Text
  } else if (elementType === 'ul') {
    elementType = RN.ScrollView
  } else if (elementType === 'li') {
    elementType = RN.View
  }

  return elementType
}




export default getElementType
