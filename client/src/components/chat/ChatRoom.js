import React from "react";
import {FormGroup, ControlLabel, FormControl, Form, Button} from "react-bootstrap";
import io from "socket.io-client";
import ChatTable from "./ChatTable.js";

class ChatRoom extends React.Component {

  state = {
    messages: [],
    newMessage: ""
  };

  socket = this.props.socket;

  componentDidMount() {
    this
      .socket
      .on("chat", message => {
        message.key = JSON.stringify(message);
        this.setState(prevState => {
          this.setState({
            messages: this
              .state
              .messages
              .concat(message)
          });
        });
      });
  }

  componentWillUnmount() {
    this
      .socket
      .close();
  }

  setNewMessage = event => {
    this.setState({newMessage: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    this
      .socket
      .emit("chat", {
        name: this.props.name,
        message: this.state.newMessage,
        timestamp: new Date().toISOString()
      });
    this.setState({newMessage: ""});
  }

  render() {
    return (
      <div>
        <div py={4} className="chatbox">
          <ChatTable messages={this.state.messages}/>

        </div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              id="message"
              type="text"
              label="Message"
              placeholder="Enter your message"
              onChange={this.setNewMessage}
              value={this.state.newMessage}
              autoComplete="off"/>
          </FormGroup>
          <Button type="submit">Send</Button>
        </Form>
      </div>
    );
  }
}

export default ChatRoom;
