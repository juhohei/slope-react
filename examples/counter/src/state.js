import {S} from 'slope'

import * as actions from './actions'

const countS = S.fork(actions.count.stream)

export const counter = S.scan((p, n) => p + n, 0)(countS)
export const clicks  = S.scan(p => p + 1, 0)(countS)

