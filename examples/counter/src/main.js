import React       from 'react'
import {render}    from 'react-dom'
import {Action, S} from 'slope'
import {lift}      from '../../../dist'


const count   = Action()
const countS  = S.fork(count.stream)
const counter = S.scan((p, n) => p + n, 0)(countS)
const clicks  = S.scan(p => p + 1, 0)(countS)

const App = () => (
  <main>
    <p>Current value of the counter is {lift(counter)} and the controls have been clicked {lift(clicks)} times.</p>
    <div>
      <button onClick={() => count(1)}>+</button>
      <button onClick={() => count(-1)}>-</button>
    </div>
  </main>
)

render(
  <App/>,
  document.getElementById('app')
)


