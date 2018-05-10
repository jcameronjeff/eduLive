import React, {Component} from 'react';
import io from 'socket.io-client';

import Header from './views/header';

const SERVER_ENDPOINT = 'http://localhost:3000';

/**
* Root component that manages the state of the application.
*/
class App extends Component {
	constructor() {
		super();

		this._setUpInitialState.call(this);

		// Autobind local methods to this
		this._onConnect = this._onConnect.bind(this);
		this._onDisconnect = this._onDisconnect.bind(this);
		this._onWelcome = this._onWelcome.bind(this);
		this._onJoined = this._onJoined.bind(this);
		this._updateVisitors = this._updateVisitors.bind(this);
		this.emit = this.emit.bind(this);

		// connecting to the server
		this.socket = io(SERVER_ENDPOINT);

		// setting up event listeners
		this.socket.on('connect', this._onConnect);
		this.socket.on('disconnect', this._onDisconnect);
		this.socket.on('welcome', this._onWelcome);
		this.socket.on('joined', this._onJoined);
		this.socket.on('visitors', this._updateVisitors);
	}

	// Setting up initial state
	_setUpInitialState() {
		this.state = {
			status: 'disconnected',
			title: '',
			member: {},
			visitors: [],
		};
	}

	// Triggered when a new socket connection occurs
	_onConnect() {
		this.setState({status: 'connected'});
	}

	// Triggered when a new socket disconnection occurs
	_onDisconnect() {
		this.setState({status: 'disconnected'});
	}

	/**
	* Fired when 'Welcome' event is emmited
	* @param {string} state - state of the server
	*/
	_onWelcome(serverState) {
		this.setState({ title: serverState.title });
	}

	_onJoined(serverState) {
		console.log('a new member joined:', serverState);
		this.setState({member: serverState});
	}

	_updateVisitors(serverState) {
		console.log('updating visitors', serverState);
		this.setState({visitors: serverState.visitors});
	}

	emit(eventName, payload) {
		this.socket.emit(eventName, payload);
	}

	render() {
		const that = this;
		const childrenWithProps = React.Children.map(
			this.props.children,
   		(child) => React.cloneElement(child, {
     			status: that.state.status,
     			title: that.state.title,
					member: that.state.member,
					visitors: that.state.visitors,
					emit: that.emit
   		})
    );

		return (
			<div>
				<Header title={this.state.title} status={this.state.status} />
				{childrenWithProps}
			</div>
		);
	}
}

export default App;
