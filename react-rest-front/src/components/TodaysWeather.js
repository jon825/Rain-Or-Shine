import React, { Component } from "react";
import "../css/App.css";
import "../css/owfont-regular.css";

class TodaysWeather extends Component {
  render() {
    let weatherTemp = this.props.weatherTemp;
    let weatherMain = this.props.weatherMain;
    let weatherDescription = this.props.weatherDescription;
    let city = this.props.city;
    let country = this.props.country;
    let icon = this.props.icon;
    let dayOrnight = this.props.dayOrnight;
    let img_icon = "owf owf-" + icon + "-" + dayOrnight + " " + "owf-5x";
    let date = this.props.date;
    let time = this.props.time;
    if(weatherMain === ""){
    }
    return (
      <div className="container">
        <div className="row">
          <h2>{date}</h2>
        </div>
        <div className="row">
          <i className={img_icon}> </i>
        </div>
        <div className="row">
          <h1>
            {city}, {country}
          </h1>
        </div>
        <div className="row">
          <p>Temperature: {weatherTemp} °C</p>
        </div>
        <div className="row">
          <p>Today's Weather: {weatherDescription}</p>
        </div>
        <div className="row">
          <p>Last updated: {time}</p>
        </div>
      </div>
    );
  }
}
export default TodaysWeather;
