import _ from 'lodash'
import React from 'react'
import { Divider, ProviderConsumer } from '@stardust-ui/react'

const colors = [
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
    // render={({ siteVariables: { colors } }) =>
    render={() =>
      _.map(colors, name => <Divider key={name} color={name as any} content={_.startCase(name)} />)
    }
  />
)

export default DividerExampleSize
