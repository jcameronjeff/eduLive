import React, {Component} from 'react';

export default class Display extends Component {	
	render() {
		return this.props.show ? <div>{this.props.children}</div> : null;
	}
}
