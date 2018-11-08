import { pxToRem } from '../../../../lib'

export interface DividerVariables {
  colors: {
    primary: string
    secondary: string
    blue: string
    green: string
    grey: string
    orange: string
    pink: string
    purple: string
    teal: string
    red: string
    yellow: string
  }
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
      primary: siteVars.colors.primary[500],
      secondary: siteVars.colors.secondary[500],
      blue: siteVars.colors.blue[500],
      green: siteVars.colors.green[500],
      grey: siteVars.colors.grey[500],
      orange: siteVars.colors.orange[500],
      pink: siteVars.colors.pink[500],
      purple: siteVars.colors.purple[500],
      teal: siteVars.colors.teal[500],
      red: siteVars.colors.red[500],
      yellow: siteVars.colors.yellow[500],
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
