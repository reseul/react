import * as PropTypes from 'prop-types'
import { customPropTypes } from './index'

export const styledComponentPropTypes = {
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}

export const animatedComponentPropTypes = {
  animation: customPropTypes.animation,
}

export const commonUIComponentPropTypes = {
  ...styledComponentPropTypes,
  ...animatedComponentPropTypes,
  as: customPropTypes.as,
  className: PropTypes.string,
}

export const colorComponentPropsTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'blue',
    'green',
    'grey',
    'orange',
    'pink',
    'purple',
    'teal',
    'red',
    'yellow',
  ]),
}

export const contentComponentPropsTypes = {
  content: customPropTypes.contentShorthand,
}

export const childrenComponentPropTypes = {
  children: PropTypes.node,
}
