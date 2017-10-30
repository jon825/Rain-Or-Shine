import React, { Component } from "react";

class FiveDayForecast extends Component{

render(){

    return(
      <div className="fiveDay">
        {this.props.card}

      </div>
      )
  }
};

export default FiveDayForecast;
