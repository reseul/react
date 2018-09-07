import { IGridVariables } from './gridVariables'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { GridTemplate, IGridProps } from '../../../../components/Grid/Grid'

const getCSSTemplateValue = (template: GridTemplate): string => {
  const templateAsNumber = Number(template)

  return !isNaN(templateAsNumber) && templateAsNumber > 0
    ? `repeat(${template}, 1fr)`
    : String(template)
}

const gridStyles: IComponentPartStylesInput = {
  root: ({
    props,
    variables: { height, width, defaultColumnCount, gridGap, padding },
  }: {
    props: IGridProps
    variables: IGridVariables
  }): ICSSInJSStyle => {
    const {
      alignContent,
      alignItems,
      gap = gridGap,
      justifyContent,
      justifyItems = 'space-evenly',
      rows,
      columns = !props.rows && defaultColumnCount,
    } = props

    const styles: ICSSInJSStyle = {
      alignContent,
      alignItems,
      height,
      justifyContent,
      justifyItems,
      width,
      padding,
      display: 'grid',
      gridGap: gap,

      ...(rows && !columns && { gridAutoFlow: 'column' }),
      ...(rows && { gridTemplateRows: getCSSTemplateValue(rows) }),
      ...(columns && { gridTemplateColumns: getCSSTemplateValue(columns) }),
    }

    return styles
  },
}

export default gridStyles
