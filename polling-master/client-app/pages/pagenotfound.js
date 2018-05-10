import React, {Component} from 'react';
import {Link} from 'react-router';

export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to:</p>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/speaker">Speaker</Link></li>
          <li><Link to="/board">View the board</Link></li>
        </ul>
      </div>
    );
  }
}
