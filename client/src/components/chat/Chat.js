import React from "react";
import {Grid} from "react-bootstrap";
// import ChatName from "./ChatName.js";
import ChatRoom from "./ChatRoom.js";

require("./Chat.css");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };

    // this.handleSubmitName = this.handleSubmitName.bind(this);
  }

  render() {
    return (
      <Grid>
        {this.state.name && <ChatRoom socket={this.props.socket} name={this.state.name}/>}
      </Grid>
    );
  }

  handleSubmitName(name) {
    this.setState({name: name});
  }
}
export default Chat;
