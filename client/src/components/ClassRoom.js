import React, { Component } from "react";
import Chat from "./chat/Chat.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paint from "./paint/Paint";
import { Grid, Col, Row } from "react-bootstrap";
import { className } from "classnames";
import Quiz from "./quiz/Quiz";
import CanvasChart from "./quiz/CanvasChart";

class ClassRoom extends Component {
  render() {
    const { user } = this.props.auth;

    console.log("CLASS", this.props);
    return (
      <div className="class-room">
        <Grid>
          <p className="lead text-muted">Welcome {user.name}</p>
          <Row>
            <Col md={6}>
              <Chat socket={this.props.socket} name={user.name} />
            </Col>
            <Col md={6}>
              <Paint socket={this.props.socket} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Quiz socket={this.props.socket} />
            </Col>
            <Col md={6}>
              <CanvasChart socket={this.props.socket} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ClassRoom.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(ClassRoom);
