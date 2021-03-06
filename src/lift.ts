import * as React from 'react'

import {Stream, Unsubscribe} from 'slope'

interface Props<T> {
  stream: Stream<T>
}

interface State<T> {
  value: T
}

class Observable<T> extends React.Component<Props<T>, State<T>>{
  private unsubscribe: Unsubscribe

  constructor (props: Props<T>) {
    super(props)
    this.state = {value: null}
  }

  componentWillMount () {
    this.unsubscribe = this.props.stream(
      value => this.setState({value}),
      () => this.unsubscribe && this.unsubscribe()
    )
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    return (this.state.value as any)
  }
}

export function lift<T>(stream: Stream<T>): any {
  return React.createElement(Observable, {stream})
}

