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
        data: [0, 0, 0, 0, 0, 0],
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
  chartStyle = {};

  render() {
    const chartStyle = {
      height: "45vh",
      margin: "0 auto",
      width: "90%",
      backgroundColor: "rgba(255, 255, 255, 0.49)",
      marginTop: "50px",
      padding: "10px",
      fontSize: "20px"
    };
    return (
      <div className="chart" style={chartStyle}>
        <BarChart
          type={"Bar"}
          data={this.chartData}
          options={this.chartOptions}
        />
      </div>
    );
  }
}

export default Quiz;
