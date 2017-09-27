import {S} from 'slope'

import * as actions from './actions'

let id = 0

const isEnter = e => e.key === 'Enter'
const assign  = (obj, prop) => Object.assign({}, obj, prop)

const clearS     = actions.clear.stream
const toggleAllS = actions.toggleAll.stream
const toggleS    = actions.toggle.stream
const delS       = actions.del.stream

const addTodoS = S.map(title => ({id: ++id, title, completed: false}))(
  S.sample(
    S.pipe([S.map(e => e.target.value), S.filter(value => value.length > 0)])(actions.add.stream),
    S.filter(isEnter)(actions.submit.stream)
  )
)
  
const routeS = S.fork(S.pipe([
  S.tap(route => history.pushState(null, '', route)),
  S.startWith(location.hash),
  S.map(getPropsForRoute)
])(actions.navigate.stream))


export const currentFilterS = S.map(route => route.filter)(routeS)
export const currentRouteS  = S.map(route => route.route)(routeS)


const allTodosS = S.fork(S.update([],
  [addTodoS,   (todos, todo) => todos.concat(todo)],
  [toggleS,    (todos, id)   => todos.map(todo => todo.id === id ? assign(todo, {completed: !todo.completed}): todo)],
  [delS,       (todos, id)   => todos.filter(todo => todo.id !== id)],
  [toggleAllS, (todos)       => todos.map(todo => assign(todo, {completed: !todo.completed}))],
  [clearS,     (todos)       => todos.filter(todo => !todo.completed)]
))

export const todosS = S.map(([todos, filter]) => todos.filter(filter))(
  S.combine([allTodosS, currentFilterS])
)

export const countS = S.fork(S.map(todos => {
  const remaining = todos.reduce((count, todo) => count + (todo.completed ? 0 : 1), 0)
  return {
    remaining,
    completed: todos.length - remaining
  }
})(allTodosS))


function getPropsForRoute (route) {
  switch (route) {
    case '#/':          return {route, filter: () =>  true}
    case '#/active':    return {route, filter: t  => !t.completed}
    case '#/completed': return {route, filter: t  =>  t.completed}
    default:            return {route, filter: () =>  true}
  }
}

