import * as PropTypes from 'prop-types'
import * as React from 'react'
import ReactNode = React.ReactNode
import { UIComponent, childrenExist, customPropTypes, IRenderResultConfig } from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { Extendable, ItemShorthand, ReactChildren } from '../../../types/utils'

export type GridTemplate = string | number
export type ItemPosition = 'start' | 'end' | 'center' | 'stretch'
export type ContentPosition = ItemPosition | 'space-around' | 'space-between' | 'space-evenly'

export interface IGridProps {
  alignContent?: ContentPosition
  alignItems?: ItemPosition
  as?: any
  className?: string
  children?: ReactChildren
  columns?: GridTemplate
  content?: ItemShorthand | ItemShorthand[]
  gap?: string
  justifyContent?: ContentPosition
  justifyItems?: ItemPosition
  rows?: GridTemplate
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

/**
 * A grid.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
class Grid extends UIComponent<Extendable<IGridProps>, any> {
  public static displayName = 'Grid'

  public static className = 'ui-grid'

  public static propTypes = {
    /** Aligns the grid along the block (column) */
    alignContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),

    /** Aligns grid items along the block (column) */
    alignItems: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'stretch',
      'space-around',
      'space-between',
      'space-evenly',
    ]),

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Shorthand for primary content. */
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([
        PropTypes.arrayOf(customPropTypes.itemShorthand),
        customPropTypes.itemShorthand,
      ]),
    ]),

    /**
     * Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows.
     * gap="<row-gap> [<column-gap>]" if unspecified, <column-gap> will be <row-gap>
     */
    gap: PropTypes.string,

    /** Aligns the grid along the inline (row) axis */
    justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),

    /** Aligns grid items along the inline (row) axis */
    justifyItems: PropTypes.oneOf([
      'start',
      'end',
      'center',
      'stretch',
      'space-around',
      'space-between',
      'space-evenly',
    ]),

    /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = [
    'alignContent',
    'alignItems',
    'as',
    'children',
    'className',
    'columns',
    'content',
    'gap',
    'justifyContent',
    'justifyItems',
    'rows',
    'styles',
    'variables',
  ]

  public static defaultProps = {
    as: 'div',
  }

  public renderComponent({ ElementType, classes, rest }: IRenderResultConfig<any>): ReactNode {
    const { children, content } = this.props

    return (
      <ElementType className={classes.root} {...rest}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

export default Grid
