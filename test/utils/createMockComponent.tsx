import * as React from 'react'
import { Props } from 'types/utils'

const createMockComponent = <P extends Props = Props>(displayName: string): React.SFC<P> => {
  const MockComponent: React.SFC<P> = props => <MockComponent {...props} />
  MockComponent.displayName = displayName
  return MockComponent
}

export default createMockComponent
