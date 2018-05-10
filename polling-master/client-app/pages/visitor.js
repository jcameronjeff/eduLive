import React, {Component} from 'react';
import Display from './../views/display';
import JoinForm from './../views/join-form';

export default class Visitor extends Component {
	render() {
		return (
			<div>
				<Display show={this.props.status === 'connected'}>
					<Display show={this.props.member.name}>
						<h2> Welcome {this.props.member.name}! </h2>
						<p>{this.props.visitors.length} visitor(s) are/is connected to this event.</p>
						<p>...</p>
					</Display>
					<Display show={!this.props.member.name}>
						<h2>Join the conference!</h2>
						<JoinForm emit={this.props.emit} />
					</Display>
				</Display>
			</div>
		)
	}
}
