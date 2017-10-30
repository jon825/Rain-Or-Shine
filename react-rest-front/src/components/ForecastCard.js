import React, { Component } from "react";

class ForecastCard extends Component{

render(){
  let temp = this.props.temp;
    return(
      <div className="card">
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{temp}</h4>
          <p className="card-text">
          </p>
        </div>
      </div>

      )
  }
};

export default ForecastCard;
