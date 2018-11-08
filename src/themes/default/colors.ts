import { createPalette } from '../../lib'
import { ColorPalette, NaturalColors } from '../types'

export const naturalColors: NaturalColors = {
  blue: createPalette('#0a84ff'),
  green: createPalette('#30e60b'),
  grey: createPalette('#737373'),
  orange: createPalette('#ff9400'),
  pink: createPalette('#ff1ad9'),
  purple: createPalette('#9400ff'),
  teal: createPalette('#00feff'),
  red: createPalette('#ff0039'),
  yellow: createPalette('#ffe900'),
}

export const colors: ColorPalette = {
  black: '#000',
  white: '#fff',

  ...naturalColors,

  primary: createPalette('#0a84ff'),
  secondary: naturalColors.grey,
  text: naturalColors.grey,

  info: naturalColors.blue,
  danger: naturalColors.red,
  success: naturalColors.green,
  warning: naturalColors.yellow,
}
