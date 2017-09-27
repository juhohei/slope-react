import React  from 'react'
import {lift} from '../../../dist'

import {clicks} from './state'


export default function Clicks () {
  return (
    <div>
      The controls have been clicked {lift(clicks)} times.
    </div>
  )
}
