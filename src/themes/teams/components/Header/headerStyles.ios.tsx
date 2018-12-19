import { ICSSInJSStyle } from '../../../types'

export default {
  root: ({ props, variables: v }): ICSSInJSStyle => ({
    color: v.color,
    textAlign: props.textAlign,
    display: 'block',
    fontSize: '2em',
    margin: '0.67em 0',
    ...(props.description && { marginBottom: 0 }),
  }),
}
