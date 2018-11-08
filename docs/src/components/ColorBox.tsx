import { ComponentSlotStylesInput, createComponent, Icon, ICSSInJSStyle } from '@stardust-ui/react'
import * as Color from 'color'
import * as _ from 'lodash'
import * as React from 'react'

import CopyToClipboard from './CopyToClipboard'

type ColorBoxProps = {
  name: string
  rounded?: boolean
  size?: 'small' | 'normal' | 'big'
  supported?: boolean
  value: string
}

type ColorBoxVariables = {
  colorBlack: string
  colorWhite: string
  fontSize: {
    big: string
    normal: string
    small: string
  }
  padding: {
    big: string
    normal: string
    small: string
  }
}

export const colorBoxVariables = (siteVariables): ColorBoxVariables => ({
  colorBlack: siteVariables.colors.black,
  colorWhite: siteVariables.colors.white,
  fontSize: {
    big: '1.25em',
    small: '.85em',
    normal: '1.25em',
  },
  padding: {
    big: '4rem .75rem .75rem .75rem',
    small: '.75rem',
    normal: '2.5rem .75rem .75rem .75rem',
  },
})

export const colorBoxStyles: ComponentSlotStylesInput<ColorBoxProps, ColorBoxVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    border: '1px solid transparent',
    borderRadius: p.rounded && '.25rem',
    display: 'grid',
    gridTemplateColumns: p.supported ? 'repeat(2, 1fr)' : '1fr',
    fontSize: v.padding[p.size],
    padding: v.padding[p.size],

    ...(p.supported
      ? {
          backgroundColor: p.value,
          color: Color(p.value).isDark() ? v.colorWhite : v.colorBlack,
        }
      : {
          backgroundImage:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
          backgroundRepeat: 'repeat',
        }),
  }),
  name: {
    fontWeight: 'bold',
  },
  value: {
    fontFamily: 'Monospace',
    textAlign: 'right',
    userSelect: 'all',

    '> span': {
      cursor: 'pointer',
    },
  },
}

const ColorBox = createComponent<ColorBoxProps>({
  displayName: 'ColorBox',
  render: ({ name, supported, value, stardust: { classes } }) => (
    <div className={classes.root}>
      <div className={classes.name}>{_.startCase(name)}</div>

      {supported ? (
        <CopyToClipboard
          render={(active, onClick) => (
            <div className={classes.value}>
              <span onClick={onClick}>
                <Icon name={active ? 'checkmark' : 'copy outline'} size="small" />
                {value}
              </span>
            </div>
          )}
          value={value}
        />
      ) : (
        <span>is not supported by theme</span>
      )}
    </div>
  ),
})

ColorBox.defaultProps = {
  size: 'normal',
  supported: true,
}

export default ColorBox
