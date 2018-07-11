import React, { Component } from "react";
import "../css/App.css";
import "../css/owfont-regular.css";

class ForecastCard extends Component{

render(){
  let temp = this.props.temp;
  let date = this.props.date;
  let icon = this.props.icon;
  let dayOrnight = this.props.dayOrnight;
  let img_icon = "owf owf-" + icon + "-" + dayOrnight + " " + "owf-5x";


    return(
      <div className="card">
        <div className="card-block">
          <p className="card-text">{date} </p>


          <i className={img_icon}> </i>

          <p className="card-text">{temp} °C</p>
        </div>
      </div>

      )
  }
};

export default ForecastCard;
