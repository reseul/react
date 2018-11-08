import * as Color from 'color'
import * as _ from 'lodash'

import { ColorPalette, ColorVariants } from '../themes/types'

const MOCK_COLOR = 'red'
const MOCK_PROPERTY = '[[UNSUPPORTED_COLOR]]'

export const setColorLightness = (base: string, value: number) =>
  Color(base)
    .hsl()
    .lightness(100 - value)
    .hex()

export const createPalette = (base: string): ColorVariants => ({
  50: setColorLightness(base, 5),
  100: setColorLightness(base, 10),
  200: setColorLightness(base, 20),
  300: setColorLightness(base, 30),
  400: setColorLightness(base, 40),
  500: base,
  600: setColorLightness(base, 60),
  700: setColorLightness(base, 70),
  800: setColorLightness(base, 80),
  900: setColorLightness(base, 90),
})

const unsupportedHandler = (baseColor: string, mockColor: string): ProxyHandler<ColorVariants> => {
  const warning = _.memoize((variant: string): string => {
    console.warn(
      `You're trying to access an unsupported variant (${variant}) of "${baseColor}" color.`,
    )

    return mockColor
  })

  return {
    get: (target: ColorVariants, prop: string) => {
      const emptyValues = Object.keys(target).length === 0

      if (prop === MOCK_PROPERTY) return emptyValues
      return target[prop] || warning(prop as string)
    },
  }
}

export const isSupportedColor = (value: ColorVariants): boolean => value && !value[MOCK_PROPERTY]

export const unsupportedColorVariants = (
  color: keyof ColorPalette,
  supportedVariants: Partial<ColorVariants> = {},
  mockColor: string = MOCK_COLOR,
): ColorVariants =>
  new Proxy<ColorVariants>(supportedVariants as ColorVariants, unsupportedHandler(color, mockColor))

export const unsupportedColor = (color: keyof ColorPalette, mockColor: string = MOCK_COLOR) =>
  unsupportedColorVariants(color, undefined, mockColor)
