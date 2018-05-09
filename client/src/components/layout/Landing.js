import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Live Edu</h1>
                <p className="lead">
                  {' '}
                  Realtime Education
                </p>
                <hr/>
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
