import * as _ from 'lodash'
import { pxToRem } from '../../../../lib'

export interface DividerVariables {
  colors: Partial<{
    primary: string
    blue: string
    green: string
    grey: string
    orange: string
    pink: string
    purple: string
    teal: string
    red: string
    yellow: string
  }>
  dividerColor: string
  textColor: string
  textFontSize: string
  textLineHeight: string
  primaryColor: string
  importantFontWeight: string
  dividerPadding: string
}

export default (siteVars: any): DividerVariables => {
  return {
    colors: {
      primary: _.get(siteVars.colors, ['primary', 500]),
      green: _.get(siteVars.colors, ['green', 500]),
      grey: _.get(siteVars.colors, ['grey', 500]),
      orange: _.get(siteVars.colors, ['orange', 500]),
      pink: _.get(siteVars.colors, ['pink', 500]),
      purple: _.get(siteVars.colors, ['purple', 500]),
      red: _.get(siteVars.colors, ['red', 500]),
      yellow: _.get(siteVars.colors, ['yellow', 500]),
    },
    dividerColor: siteVars.gray09,
    textColor: siteVars.gray03,
    textFontSize: siteVars.fontSizeSmall,
    textLineHeight: siteVars.lineHeightSmall,
    primaryColor: siteVars.brand,
    importantFontWeight: siteVars.fontWeightBold,
    dividerPadding: pxToRem(4),
  }
}
