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
import BarChart from "react-chartjs-2";

class Quiz extends React.Component {
  chartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  render() {
    const quizStyle = {
      height: "85vh"
    };
    return (
      <div className="quiz" style={quizStyle}>
        <Grid>
          <Row>
            <BarChart data={this.chartData} />
          </Row>
          <Row>
            <Col md={8}>
              <h3>What is the answer to my really awesome question?</h3>
              <br />
              <FormGroup>
                <p>
                  <Radio name="radioGroup" inline>
                    1
                  </Radio>
                </p>
                <p>
                  <Radio name="radioGroup" inline>
                    2
                  </Radio>
                </p>
                <p>
                  <Radio name="radioGroup" inline>
                    3
                  </Radio>
                </p>
                <Button bsStyle="primary">Submit</Button>
              </FormGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Quiz;
