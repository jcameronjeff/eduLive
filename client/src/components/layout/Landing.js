import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "tabler-react";
class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="mask rgba-gradient d-flex justify-content-center align-items-center dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 white-text text-center text-md-left mt-xl-5 mb-5 wow fadeInLeft"
                data-wow-delay="0.3s"
              >
                <h1 className="h1-responsive font-weight-bold mt-sm-5">
                  LiveEdu
                </h1>
                <hr className="hr-light" />
                <h6 className="mb-4">
                  A Real-Time learning management system.
                </h6>
                <Link to="/login">
                  <a className="btn btn-outline-white">Sign In</a>
                </Link>
                <Link to="/register">
                  <a className="btn btn-outline-white">Sign Up</a>
                </Link>
              </div>
              <div
                className="col-md-6 col-xl-5 mt-xl-5 wow fadeInRight"
                data-wow-delay="0.3s"
              >
                <img
                  src="https://images.vexels.com/media/users/3/146895/isolated/preview/5e9d3222fa9269213c6747474cba1209-light-bulb-cartoon-by-vexels.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
