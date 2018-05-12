import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Button,
  Row
} from "react-bootstrap";
import ChatTable from "./ChatTable.js";

class ChatRoom extends React.Component {
  state = {
    messages: [],
    newMessage: "",
    membercount: 0
  };

  socket = this.props.socket;

  componentDidMount() {
    console.log("chat", this.props);
    this.socket.on("chat", message => {
      message.key = JSON.stringify(message);
      this.setState(prevState => {
        this.setState({
          messages: this.state.messages.concat(message)
        });
      });
    });

    this.socket.on("users", users => {
      console.log(users);
      this.setState(prevState => {
        this.setState({ membercount: users });
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
    this.socket.emit("chat", {
      name: this.props.name,
      message: this.state.newMessage,
      timestamp: new Date().toISOString()
    });
    this.setState({ newMessage: "" });
  };

  render() {
    return (
      <div>
        <div py={4} className="chatbox card">
          <h4>Students Online: {this.state.membercount}</h4>
          <ChatTable messages={this.state.messages} />
          <hr />
          <Form inline onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl
                id="message"
                type="text"
                label="Message"
                placeholder="Enter your message"
                onChange={this.setNewMessage}
                value={this.state.newMessage}
                autoComplete="off"
              />
            </FormGroup>

            <Button type="submit">Send</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
