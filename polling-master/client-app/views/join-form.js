import React, {Component} from 'react';

export default class JoinForm extends Component {
  constructor() {
    super();

    this.join = this.join.bind(this);
  }

  join() {
    this.props.emit('join', {name: this.textInput.value});
  }

  render() {
		return (
			<form action='javascript:void(0)' onSubmit={this.join}>
        <input ref={(input) => { this.textInput = input; }}
          className='form-control'
          placeholder='Enter your full name'
          required />
        <button className='btn btn-primary'>Join the Conference</button>
      </form>
		)
	}
}
