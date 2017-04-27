import * as React from 'react'

import {Stream, Unsubscribe} from 'slope'

interface Props<T> {
  stream: Stream<T>
}

interface State<T> {
  value: T
}

const noop: () => void = () => {}

class Observable<T> extends React.Component<Props<T>, State<T>>{
  private unsubscribe: Unsubscribe

  constructor (props: Props<T>) {
    super(props)
    this.state = {value: null}
  }

  componentWillMount () {
    this.unsubscribe = this.props.stream(value => this.setState({value}), noop)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const value = this.state.value

    if (value === null) {
      return null
    }

    return React.isValidElement(value)
      ? value
      : React.createElement('span', null, value)
  }
}

export function lift<T>(stream: Stream<T>): any {
  return React.createElement(Observable, {stream})
}

