import React from "react";
import { Container, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

class ChatTable extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Panel>
        <ListGroup>
          {this.props.messages.map(message => (
            <ListGroupItem key={message.key}>
              <strong>{message.name}: </strong>
              {message.message}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Panel>
    );
  }
}

export default ChatTable;
