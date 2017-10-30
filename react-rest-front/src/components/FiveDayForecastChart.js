import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";

class FiveDayForecastChart extends Component {
  render() {
    let forecastData = this.props.forecastData;
    let forecastDates;
    let forecastTemps;
    if (!forecastData.length == 0) {
      forecastDates = forecastData.map(obj => {
        let date = obj.dt_txt.slice(0, -24);
        return date;
      });
      forecastTemps = forecastData.map(obj => {
        let temp = obj.main.temp;
        return temp;
      });
    }
    let graphData = {
      data: {
        labels: forecastDates,
        lineTension: 0,

        datasets: [
          {
            label: "Temperature °C",
            borderColor: "black",
            backgroundColor: "transparent",
            data: forecastTemps
          }
        ]
      },
      options: {
        animation: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        maintainAspectRatio: false
      }
    };

    return (
      <div className="chart-container">
        <div className="chart">
          <Line data={graphData.data} options={graphData.options} />
        </div>
      </div>
    );
  }
}

export default FiveDayForecastChart;
