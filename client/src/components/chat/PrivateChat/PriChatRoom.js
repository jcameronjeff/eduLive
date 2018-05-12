import React from "react";

import Card from "mdbreact";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Button,
  Row,
  Grid
} from "react-bootstrap";
import io from "socket.io-client";
import PriChatTable from "./PriChatTable.js";
import { className } from "classnames";

class PriChatRoom extends React.Component {
  state = {
    messages: [],
    newMessage: ""
  };

  socket = this.props.socket;

  componentDidMount() {
    console.log("prichat", this.props);
    this.socket.on("prichat", message => {
      message.key = JSON.stringify(message);
      this.setState(prevState => {
        this.setState({ messages: this.state.messages.concat(message) });
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  setNewMessage = event => {
    this.setState({ newMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.socket.emit("prichat", {
      name: this.props.name,
      message: this.state.newMessage,
      timestamp: new Date().toISOString()
    });
    this.setState({ newMessage: "" });
  };

  render() {
    const messageStyle = {
      height: "450px",
      overflow: "scroll"
    };
    const messageInputStyle = {
      width: "50vw",

      padding: "20px",
      float: "left"
    };

    const messageBtnStyle = { padding: "30px" };
    return (
      <div className="container">
        <div className="card md-6 lg-6">
          <div className="Row" style={messageStyle}>
            <PriChatTable messages={this.state.messages} />
          </div>
          <hr />
          <div className="Row text-center">
            <Form className="p-5" inline onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl
                  id="message"
                  type="textarea"
                  label="Message"
                  placeholder="Enter your message"
                  onChange={this.setNewMessage}
                  value={this.state.newMessage}
                  autoComplete="off"
                  style={messageInputStyle}
                />
                <Button style={messageBtnStyle} type="submit">
                  Send
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default PriChatRoom;
