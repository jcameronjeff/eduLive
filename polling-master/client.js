import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

import App from './client-app/app';
import Visitor from './client-app/pages/visitor';
import Speaker from './client-app/pages/speaker';
import Board from './client-app/pages/board';
import PageNotFound from './client-app/pages/pagenotfound';

const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={Visitor}></IndexRoute>
			<Route path='speaker' component={Speaker}></Route>
			<Route path='board' component={Board}></Route>
			<Route path="*" component={PageNotFound}></Route>
		</Route>
	</Router>
);

// Rendering Main Component
ReactDOM.render(routes, document.getElementById('container'));
