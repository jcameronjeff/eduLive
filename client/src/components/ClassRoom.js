import React, {Component} from "react";
import Chat from "./Chat.js";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Paint from "./Paint";
import {Grid, Col, Row} from "react-bootstrap";
import {className} from "classnames";
import io from "socket.io-client";

const socket = io(window.location.origin)
class ClassRoom extends Component {

  //socket = io("http://localhost:3001")

  render() {
    const {user} = this.props.auth;
    return (
      <div className="class-room">
        <Grid>
          <p className="lead text-muted">Welcome {user.name}</p>
          <Row>
            <Col md={6}>
              <Chat socket={socket} name={user.name}/>
            </Col>
            <Col md={6}>
              <Paint socket={socket}/>
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

const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps)(ClassRoom)