import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

class PriChatTable extends React.Component {
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

export default PriChatTable;
