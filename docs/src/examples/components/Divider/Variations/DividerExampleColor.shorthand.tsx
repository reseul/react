import _ from 'lodash'
import React from 'react'
import { Divider, ProviderConsumer } from '@stardust-ui/react'

const DividerExampleSize = () => (
  <ProviderConsumer
    render={({ siteVariables: { emphasisColors, naturalColors } }) =>
      _.map({ ...emphasisColors, ...naturalColors }, (variants, name) => (
        <Divider key={name} color={name as any} content={_.startCase(name)} />
      ))
    }
  />
)

export default DividerExampleSize
