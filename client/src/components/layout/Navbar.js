import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="landing.html">
            LiveEdu
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/classroom">
                  ClassRoom Live
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prichat">
                  Chat
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/paint">
                  WhiteBoard
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  Logout
                  <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: "25px", marginRight: "5px" }}
                  />{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logoutUser })(Navbar);
