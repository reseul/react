import { remToPx } from './fontSizeUtility'

const validStyles = [
  "alignContent",
  "alignItems",
  "alignSelf",
  "aspectRatio",
  "backfaceVisibility",
  "backgroundColor",
  "borderBottomColor",
  "borderBottomEndRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderBottomStartRadius",
  "borderBottomWidth",
  "borderColor",
  "borderEndColor",
  "borderEndWidth",
  "borderLeftColor",
  "borderLeftWidth",
  "borderRadius",
  "borderRightColor",
  "borderRightWidth",
  "borderStartColor",
  "borderStartWidth",
  "borderStyle",
  "borderTopColor",
  "borderTopEndRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderTopStartRadius",
  "borderTopWidth",
  "borderWidth",
  "bottom",
  "color",
  "decomposedMatrix",
  "direction",
  "display",
  "elevation",
  "end",
  "flex",
  "flexBasis",
  "flexDirection",
  "flexGrow",
  "flexShrink",
  "flexWrap",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "height",
  "includeFontPadding",
  "justifyContent",
  "left",
  "letterSpacing",
  "lineHeight",
  "margin",
  "marginBottom",
  "marginEnd",
  "marginHorizontal",
  "marginLeft",
  "marginRight",
  "marginStart",
  "marginTop",
  "marginVertical",
  "maxHeight",
  "maxWidth",
  "minHeight",
  "minWidth",
  "opacity",
  "overflow",
  "overlayColor",
  "padding",
  "paddingBottom",
  "paddingEnd",
  "paddingHorizontal",
  "paddingLeft",
  "paddingRight",
  "paddingStart",
  "paddingTop",
  "paddingVertical",
  "position",
  "resizeMode",
  "right",
  "rotation",
  "scaleX",
  "scaleY",
  "shadowColor",
  "shadowOffset",
  "shadowOpacity",
  "shadowRadius",
  "start",
  "textAlign",
  "textAlignVertical",
  "textDecorationColor",
  "textDecorationLine",
  "textDecorationStyle",
  "textShadowColor",
  "textShadowOffset",
  "textShadowRadius",
  "tintColor",
  "top",
  "transform",
  "transformMatrix",
  "translateX",
  "translateY",
  "width",
  "writingDirection",
  "zIndex"
]

const stylesToBeNumberified = [
  "borderRadius",
  "borderWidth",
  "height",
  "width",
  "maxWidth",
  "minWidth",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marginBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "fontSize",
]

/**
 * Checks whether provided CSS property value is safe for being rendered by Fela engine.
 */
const isValidCssValue = (value: any) => {
  if (typeof value !== 'string') {
    return true
  }

  const openingBrackets = '({['
  const closingBrackets = ')}]'

  const openingBracketsStack: string[] = []

  /**
   * This loop logic checks whether braces sequence of input argument is valid.
   * Essentially, it ensures that each of the '(', '{', '[' braces
   * - is properly matched by its complementary closing character
   * - closing brace properly corresponds to the last opened one
   */
  for (let i = 0; i < value.length; ++i) {
    const currentCharacter = value[i]
    if (openingBrackets.includes(currentCharacter)) {
      openingBracketsStack.push(currentCharacter)
    } else if (closingBrackets.includes(currentCharacter)) {
      const lastOpeningBracket = openingBracketsStack.pop()
      if (
        lastOpeningBracket &&
        openingBrackets.indexOf(lastOpeningBracket) !== closingBrackets.indexOf(currentCharacter)
      ) {
        return false
      }
    }
  }

  return openingBracketsStack.length === 0
}

export default (config?: { skip?: string[] }) => {
  const cssPropertiesToSkip = [...((config && config.skip) || [])]

  const sanitizeCssStyleObject = styles => {
    const processedStyles = {}

    Object.keys(styles).forEach(cssPropertyName => {

      // Skip some names
      if (cssPropertyName === '::placeholder' ||
          cssPropertyName === ':focus' ||
          cssPropertyName === ':hover' ||
          cssPropertyName[0] === '&' ) {
        return
      }

      let cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        processedStyles[cssPropertyName] = sanitizeCssStyleObject(cssPropertyValue)
        return
      }

      const isPropertyToSkip = cssPropertiesToSkip.some(
        propToExclude => propToExclude === cssPropertyName,
      )
      if (isPropertyToSkip || isValidCssValue(cssPropertyValue)) {

        // iOS processing

        // 'display: inline-flex' and others should be 'display: flex', as a workaround
        if (cssPropertyName === 'display' &&
          (cssPropertyValue === 'inline-flex' || cssPropertyValue === 'block' || cssPropertyValue === 'inline-block')) {
          cssPropertyValue = 'flex'
        }

        // big hack for grid
        if (cssPropertyName === 'display' && cssPropertyValue === 'grid') {
          cssPropertyValue = 'flex'
        }
        if (cssPropertyName === 'gridTemplateRows') {
          cssPropertyName = 'flexDirection'
          cssPropertyValue = 'column'
        } else if (cssPropertyName === 'gridTemplateColumns') {
          cssPropertyName = 'flexDirection'
          cssPropertyValue = 'row'
        }

        // Ignore some fluff
        if (cssPropertyName === 'flex' && cssPropertyValue === 'none') {
          return
        }

        // Numberifying
        if (stylesToBeNumberified.some(
          styleToBeNumberified => styleToBeNumberified === cssPropertyName
        ) && typeof cssPropertyValue === 'string') {
          cssPropertyValue = remToPx(cssPropertyValue)
        }

        // Margin and padding
        if ((cssPropertyName === 'padding' || cssPropertyName === 'margin') && typeof cssPropertyValue === 'string') {
          const parts = cssPropertyValue.split(' ')
          if (parts.length === 4) {
            processedStyles[cssPropertyName + 'Left'] = remToPx(parts[0])
            processedStyles[cssPropertyName + 'Top'] = remToPx(parts[1])
            processedStyles[cssPropertyName + 'Right'] = remToPx(parts[2])
            processedStyles[cssPropertyName + 'Bottom'] = remToPx(parts[3])
            return
          }
        }

        const validStyle = validStyles.some(
          style => style === cssPropertyName
        )

        if (validStyle) {
          processedStyles[cssPropertyName] = cssPropertyValue
        } else {
          ;
        }
      }
    })

    return processedStyles
  }

  return sanitizeCssStyleObject
}

// Polypolyfill the __assign so we allow "falsy" elements
var __DEV__ = true

Object.assign = function(target, sources) {
  if (__DEV__) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
      throw new TypeError(
        'In this environment the target of assign MUST be an object. ' +
        'This error is a performance optimization and not spec compliant.'
      );
    }
  }

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null || nextSource === false) {
      continue;
    }

    if (__DEV__) {
      if (typeof nextSource !== 'object' &&
          typeof nextSource !== 'function') {
        throw new TypeError(
          'In this environment the sources for assign MUST be an object. ' +
          'This error is a performance optimization and not spec compliant.'
        );
      }
    }

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects.

    for (var key in nextSource) {
      if (__DEV__) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (!hasOwnProperty.call(nextSource, key)) {
          throw new TypeError(
            'One of the sources for assign has an enumerable key on the ' +
            'prototype chain. Are you trying to assign a prototype property? ' +
            'We don\'t allow it, as this is an edge case that we do not support. ' +
            'This error is a performance optimization and not spec compliant.'
          );
        }
      }
      target[key] = nextSource[key];
    }
  }

  return target;
};

