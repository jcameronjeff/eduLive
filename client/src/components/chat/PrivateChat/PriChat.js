import React from "react";
import { Grid } from "react-bootstrap";
// import ChatName from "./ChatName.js";
import PriChatRoom from "./PriChatRoom.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PriChat extends React.Component {
  render() {
    const { user } = this.props.auth;

    return (
      <Grid>
        {user.name && (
          <PriChatRoom socket={this.props.socket} name={user.name} />
        )}
      </Grid>
    );
  }

  handleSubmitName(name) {
    this.setState({ name: name });
  }
}

PriChat.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(PriChat);
