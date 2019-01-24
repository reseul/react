import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ButtonProps, ButtonState } from '../../../../components/Button/Button'

const buttonStyles: ComponentSlotStylesInput<ButtonProps & ButtonState, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, primary, text, iconOnly, isFromKeyboard } = props

    const {
      height,
      minWidth,
      maxWidth,
      borderRadius,
      circularRadius,
      paddingLeftRightValue,

      backgroundColor,
      backgroundColorActive,
      backgroundColorHover,
      backgroundColorFocus,
      backgroundColorDisabled,
      borderColor,
      borderColorActive,
      borderColorHover,
      borderColorFocus,
      borderColorFocusIndicator,
      borderColorDisabled,
      borderWidth,

      primaryBackgroundColor,
      primaryBackgroundColorActive,
      primaryBackgroundColorHover,
      primaryBackgroundColorFocus,
      primaryBorderColor,
      primaryBorderColorActive,
      primaryBorderColorHover,
      primaryBorderColorFocus,
      primaryBorderColorFocusIndicator,
      primaryBorderWidth,

      primaryCircularBorderColorFocusIndicator,

      circularBackgroundColor,
      circularBackgroundColorActive,
      circularBackgroundColorHover,
      circularBackgroundColorFocus,
      circularBorderColor,
      circularBorderColorActive,
      circularBorderColorHover,
      circularBorderColorFocus,
      circularBorderColorFocusIndicator,

      boxShadow,
    } = variables

    return {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      cursor: 'pointer',

      // rectangular button defaults
      ...(!text && {
        outline: 0,
        borderRadius: '2px',
        borderWidth: `${pxToRem(borderWidth)}`,
        borderStyle: 'solid',
        borderColor,
        boxShadow,
        ':hover': {
          backgroundColor: backgroundColorHover,
          borderColor: borderColorHover,
        },
        ...(isFromKeyboard && {
          ':focus': {
            backgroundColor: backgroundColorFocus,
            borderColor: borderColorFocus,
            ':after': {
              content: '""',
              position: 'absolute',
              top: `-${pxToRem(borderWidth * 2)}`,
              right: `-${pxToRem(borderWidth * 2)}`,
              bottom: `-${pxToRem(borderWidth * 2)}`,
              left: `-${pxToRem(borderWidth * 2)}`,
              borderWidth: `${pxToRem(borderWidth)}`,
              borderStyle: 'solid',
              borderColor: `${borderColorFocusIndicator}`,
              borderRadius: '3px',
            },
          },
        }),
        ...(!isFromKeyboard && {
          ':focus': {
            ':active': {
              backgroundColor: backgroundColorActive,
              borderColor: borderColorActive,
              boxShadow: 'none',
            },
          },
        }),
      }),

      // circular button defaults
      ...(circular &&
        !text && {
          minWidth: height,
          padding: 0,
          backgroundColor: circularBackgroundColor,
          borderColor: circularBorderColor,
          borderRadius: circularRadius,
          ':hover': {
            backgroundColor: circularBackgroundColorHover,
            borderColor: circularBorderColorHover,
          },
          ...(isFromKeyboard && {
            ':focus': {
              backgroundColor: circularBackgroundColorFocus,
              borderColor: circularBorderColorFocus,
              ':after': {
                content: '""',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                borderWidth: `${pxToRem(borderWidth)}`,
                borderStyle: 'solid',
                borderColor: `${circularBorderColorFocusIndicator}`,
                borderRadius: circularRadius,
              },
            },
          }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                backgroundColor: circularBackgroundColorActive,
                borderColor: circularBorderColorActive,
                boxShadow: 'none',
              },
            },
          }),
        }),

      // text button defaults
      ...(text && {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }),

      // Overrides for "primary" buttons
      ...(primary &&
        !text && {
          backgroundColor: primaryBackgroundColor,
          borderWidth: `${pxToRem(primaryBorderWidth)}`,
          borderStyle: 'solid',
          borderColor: `${primaryBorderColor}`,
          ':hover': {
            backgroundColor: primaryBackgroundColorHover,
            borderColor: primaryBorderColorHover,
          },
          ...(isFromKeyboard &&
            !circular && {
              ':focus': {
                backgroundColor: primaryBackgroundColorFocus,
                borderColor: primaryBorderColorFocus,
                ':after': {
                  content: '""',
                  position: 'absolute',
                  top: `-${pxToRem(primaryBorderWidth * 2)}`,
                  right: `-${pxToRem(primaryBorderWidth * 2)}`,
                  bottom: `-${pxToRem(primaryBorderWidth * 2)}`,
                  left: `-${pxToRem(primaryBorderWidth * 2)}`,
                  borderWidth: `${pxToRem(primaryBorderWidth)}`,
                  borderStyle: 'solid',
                  borderColor: `${primaryBorderColorFocusIndicator}`,
                  borderRadius: '3px',
                },
              },
            }),
          ...(isFromKeyboard &&
            circular && {
              ':focus': {
                backgroundColor: primaryBackgroundColorFocus,
                borderColor: primaryBackgroundColorFocus,
                ':after': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  left: '0',
                  borderWidth: `${pxToRem(primaryBorderWidth)}`,
                  borderStyle: 'solid',
                  borderColor: `${primaryCircularBorderColorFocusIndicator}`,
                  borderRadius: circularRadius,
                },
              },
            }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                backgroundColor: primaryBackgroundColorActive,
                borderColor: primaryBorderColorActive,
                boxShadow: 'none',
              },
            },
          }),
        }),

      // Overrides for "disabled" buttons
      ...(disabled && {
        cursor: 'default',
        backgroundColor: backgroundColorDisabled,
        borderColor: borderColorDisabled,
        boxShadow: 'none',
        ':hover': {
          backgroundColor: backgroundColorDisabled,
          borderColor: borderColorDisabled,
        },
      }),

      ...(fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(iconOnly && {
        minWidth: height,
        padding: 0,
      }),
    }
  },

  content: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, primary, text, isFromKeyboard } = props

    const {
      color,
      colorActive,
      colorHover,
      colorFocus,
      colorDisabled,

      primaryColor,
      primaryColorActive,
      primaryColorHover,
      primaryColorFocus,

      circularColor,
      circularColorActive,

      textColor,
      textColorHover,
      textPrimaryColor,
      textPrimaryColorHover,
    } = variables

    return {
      color,

      // rectangular button defaults
      ...(!text && {
        ':hover': {
          color: colorHover,
        },
        ...(isFromKeyboard && {
          ':focus': {
            color: colorFocus,
          },
        }),
        ...(!isFromKeyboard && {
          ':focus': {
            ':active': {
              color: colorActive,
            },
          },
        }),
      }),

      // circular button defaults
      ...(circular &&
        !text && {
          color: circularColor,
          ':hover': {
            color: circularColorActive,
          },
          ...(isFromKeyboard && {
            ':focus': {
              color: circularColorActive,
            },
          }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                color: circularColorActive,
              },
            },
          }),
        }),

      // text button defaults
      ...(text && {
        color: textColor,
        ':hover': {
          color: textColorHover,
        },
        ...(primary && {
          color: textPrimaryColor,
          ':hover': {
            color: textPrimaryColorHover,
          },
        }),
      }),

      // Overrides for "primary" buttons
      ...(primary &&
        !text && {
          color: primaryColor,
          ':hover': {
            color: primaryColorHover,
          },
          ...(isFromKeyboard &&
            !circular && {
              ':focus': {
                color: primaryColorFocus,
              },
            }),
          ...(isFromKeyboard &&
            circular && {
              ':focus': {
                color: primaryColorFocus,
              },
            }),
          ...(!isFromKeyboard && {
            ':focus': {
              ':active': {
                color: primaryColorActive,
              },
            },
          }),
        }),

      // Overrides for "disabled" buttons
      ...(disabled && {
        color: colorDisabled,
      }),

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  },
}

export default buttonStyles
