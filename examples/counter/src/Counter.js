import React  from 'react'
import {lift} from '../../../dist'

import {counter} from './state'


export default function Counter () {
  return (
    <div>
      Current value of the counter is {lift(counter)}.
    </div>
  )
}
