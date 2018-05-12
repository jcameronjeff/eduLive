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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorReducer from "../../reducers/errorReducer";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedAnswer: "" };
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = this.props.socket;
    this.user = this.props.name;
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

  handleRaiseHand = e => {
    e.preventDefault();
    console.log(this.user);
    this.socket.emit("hand", { user: this.user });
  };
  componentDidMount() {
    this.socket.on("hand", user => {
      toast.info(user.user + " raised their hand", {
        position: toast.POSITION.TOP_CENTER
      });
    });
  }

  render() {
    const quizStyle = {
      margin: "0 auto",
      padding: "10px"
    };
    return (
      <div style={quizStyle}>
        <ToastContainer />
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
        <a style={{ float: "right" }}>
          <img
            style={{ margin: "10px", width: "60px", cursor: "pointer" }}
            src={
              "http://icons.iconarchive.com/icons/graphicloads/medical-health/256/hand-icon.png"
            }
            onClick={this.handleRaiseHand}
          />click for help
        </a>
      </div>
    );
  }
}

export default Quiz;
