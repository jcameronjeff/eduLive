import React, { Component } from "react";
import Chat from "./chat/Chat.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paint from "./paint/Paint";
import { Grid, Col, Row } from "react-bootstrap";
import { className } from "classnames";
import Quiz from "./quiz/Quiz";
import CanvasChart from "./quiz/CanvasChart";
import QuizQuestion from "./quiz/QuizQuestion";

class ClassRoom extends Component {
  render() {
    const { user } = this.props.auth;
    console.log("CLASS", this.props);
    return (
      <div className="class-room light-overlay mb-5">
        <div className="container-fluid">
          <div className="row my-5 mt-5">
            <Col md={4} lg={3} sm={12}>
              <Chat socket={this.props.socket} name={user.name} />
            </Col>
            <Col md={6} lg={6} sm={12}>
              <div className="card quiz p-5">
                <p className="lead text-muted">Welcome {user.name}</p>
                <Quiz socket={this.props.socket} name={user.name} />
              </div>
            </Col>

            <Col md={4} lg={3} sm={12}>
              <CanvasChart socket={this.props.socket} />
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

ClassRoom.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(ClassRoom);
