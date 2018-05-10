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
      height: "45vh",
      margin: "0 auto",
      width: "90%",
      backgroundColor: "white",
      marginTop: "50px",
      padding: "10px"
    };
    return (
      <div style={quizStyle}>
        <h3>What is the answer to my really awesome question?</h3>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Radio
              name="radioGroup"
              value="A"
              checked={this.state.selectedAnswer === "A"}
              onChange={this.handleAnswerChange}
            >
              A
            </Radio>

            <Radio
              name="radioGroup"
              value="B"
              checked={this.state.selectedAnswer === "B"}
              onChange={this.handleAnswerChange}
            >
              B
            </Radio>

            <Radio
              name="radioGroup"
              value="C"
              checked={this.state.selectedAnswer === "C"}
              onChange={this.handleAnswerChange}
            >
              C
            </Radio>
            <Radio
              name="radioGroup"
              value="D"
              checked={this.state.selectedAnswer === "D"}
              onChange={this.handleAnswerChange}
            >
              D
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
