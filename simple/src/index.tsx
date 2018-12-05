import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'

const _rootId = 'root'
const root = document.createElement('div')
root.id = _rootId

document.body.appendChild(root)

ReactDOM.render(<App />, document.getElementById(_rootId))
