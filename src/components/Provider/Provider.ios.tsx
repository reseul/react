import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Provider as RendererProvider, ThemeProvider } from 'react-fela'

import { mergeThemes } from '../../lib'
import { ThemePrepared, ThemeInput } from '../../themes/types'
import ProviderConsumer from './ProviderConsumer'

export interface ProviderProps {
  theme: ThemeInput
  children: React.ReactNode
}

/**
 * The Provider passes the CSS in JS renderer and theme to your components.
 */
class Provider extends React.Component<ProviderProps> {
  staticStylesRendered: boolean = false

  static propTypes = {
    theme: PropTypes.shape({
      siteVariables: PropTypes.object,
      componentVariables: PropTypes.object,
      componentStyles: PropTypes.object,
      rtl: PropTypes.bool,
      fontFaces: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          paths: PropTypes.arrayOf(PropTypes.string),
          style: PropTypes.shape({
            fontStretch: PropTypes.string,
            fontStyle: PropTypes.string,
            fontVariant: PropTypes.string,
            fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            localAlias: PropTypes.string,
            unicodeRange: PropTypes.string,
          }),
        }),
      ),
      staticStyles: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
      ),
      animations: PropTypes.object,
    }),
    children: PropTypes.element.isRequired,
  }

  static Consumer = ProviderConsumer

  render() {
    const { theme, children } = this.props

    // rehydration disabled to avoid leaking styles between renderers
    // https://github.com/rofrischmann/fela/blob/master/docs/api/fela-dom/rehydrate.md
    return (
      <ProviderConsumer
        render={(incomingTheme: ThemePrepared) => {
          const outgoingTheme: ThemePrepared = mergeThemes(incomingTheme, theme)
          return (
            <RendererProvider renderer={outgoingTheme.renderer} {...{ rehydrate: false }}>
              <ThemeProvider theme={outgoingTheme}>{children}</ThemeProvider>
            </RendererProvider>
          )
        }}
      />
    )
  }
}

export default Provider
