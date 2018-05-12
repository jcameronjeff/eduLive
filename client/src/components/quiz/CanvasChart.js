import React from "react";
import CanvasJS from "../canvasjs/canvasjs.min.js";
import io from "socket.io-client";
import { isThisSecond } from "date-fns";

class CanvasChart extends React.Component {
  state = {
    chardata: [
      { label: "A", y: 0 },
      { label: "B", y: 0 },
      { label: "C", y: 0 },
      { label: "D", y: 0 }
    ]
  };
  socket = this.props.socket;

  componentDidMount() {
    this.socket.on("vote", data => {
      console.log(data);

      this.setState(prevState => {
        this.state.chardata.map(x => {
          if (x.label == data.vote) {
            x.y += 1;
            return x;
          } else {
            return x;
          }
        });
      });
      chart.render();
    });
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Answers"
      },
      data: [
        {
          type: "column",
          dataPoints: this.state.chardata
        }
      ]
    });
    chart.render();
  }
  render() {
    return (
      <div
        id="chartContainer"
        style={{ height: 575 + "px", width: 100 + "%" }}
      />
    );
  }
}

export default CanvasChart;
