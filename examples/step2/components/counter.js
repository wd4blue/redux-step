import React, {PropTypes} from 'react';

import './counter.scss';

@autobind
export default class Counter extends React.Component {

  static propTypes = {
    // 替代原propTypes 属性,注意前面有static,属于静态方法.
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times
        <button onClick={onIncrement} className="btn"> + </button>
        <button onClick={onDecrement} className="btn"> - </button>
      </p>
    )
  }
}

