import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider, themes } from '@stardust-ui/react'

import App from './App'

const _rootId = 'root'
const root = document.createElement('div')
root.id = _rootId

document.body.appendChild(root)

ReactDOM.render(
  <Provider theme={themes.teams}>
    <App />
  </Provider>,
  document.getElementById(_rootId),
)
