import React     from 'react'
import {S}       from 'slope'
import {lift}    from '../../../dist'

import Counter  from './Counter'
import Clicks   from './Clicks'
import Controls from './Controls'

export default function App () {
  return (
    <main>
      <Counter/>
      <Clicks/>
      <Controls/>
    </main>
  )
}
