import _ from 'lodash'
import React from 'react'
import { Divider, isSupportedColor, ProviderConsumer } from '@stardust-ui/react'

const names = [
  'primary',
  'secondary',
  'blue',
  'green',
  'grey',
  'orange',
  'pink',
  'purple',
  'teal',
  'red',
  'yellow',
]

const DividerExampleSize = () => (
  <ProviderConsumer
    render={({ siteVariables: { colors } }) => (
      <>
        {_.map(
          names,
          name =>
            isSupportedColor(colors[name]) && (
              <Divider key={name} color={name as any} content={`${_.startCase(name)} divider`} />
            ),
        )}
      </>
    )}
  />
)

export default DividerExampleSize
