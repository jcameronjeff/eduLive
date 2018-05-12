import React from "react";
import {
  Grid,
  FormGroup,
  Radio,
  Form,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { className } from "classnames";
import Chart from "./Chart";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedAnswer: "" };
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = this.props.socket;
  }

  handleAnswerChange(e) {
    this.setState({
      selectedAnswer: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const answerData = {
      answer: this.state.selectedAnswer
    };

    this.socket.emit("vote", {
      vote: this.state.selectedAnswer
    });
    console.log(answerData);
  };

  render() {
    const quizStyle = {
      margin: "0 auto",
      padding: "10px"
    };
    return (
      <div style={quizStyle}>
        <h3>What are WebSockets?</h3>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Radio
              name="radioGroup"
              value="A"
              checked={this.state.selectedAnswer === "A"}
              onChange={this.handleAnswerChange}
            >
              WebSockets enable two-way communication between client ans server.
            </Radio>

            <Radio
              name="radioGroup"
              value="B"
              checked={this.state.selectedAnswer === "B"}
              onChange={this.handleAnswerChange}
            >
              WebSockets enable HTTP transmition of data from server to client.
            </Radio>

            <Radio
              name="radioGroup"
              value="C"
              checked={this.state.selectedAnswer === "C"}
              onChange={this.handleAnswerChange}
            >
              WebSockets connect independent pieces of middleware.
            </Radio>
            <Radio
              name="radioGroup"
              value="D"
              checked={this.state.selectedAnswer === "D"}
              onChange={this.handleAnswerChange}
            >
              WebSockets are weaved by electric spiders.
            </Radio>
            <Button type="submit" bsStyle="primary">
              Submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Quiz;
