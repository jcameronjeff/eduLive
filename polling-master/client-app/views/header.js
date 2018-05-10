import React, {Component} from 'react';

export default class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className="row">
				<div className="col-xs-10">
					<h1>{this.props.title}</h1>
				</div>
				<div className="col-xs-2">
					<span id="connection-status" className={this.props.status} />
				</div>
			</header>
		);
	}
}

// setting properies types validation
Header.propTypes = {
	title: React.PropTypes.string.isRequired
}

Header.defaultProps = {
	status: 'disconnected'
}