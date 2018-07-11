import React, { Component } from "react";
import Search from "./Search";
import TodaysWeather from "./TodaysWeather";
import FiveDayForecast from "./FiveDayForecast";
import FiveDayForecastChart from "./FiveDayForecastChart";
import ForecastCard from "./ForecastCard";
import "../css/App.css";
import axios from "axios";
import "../css/owfont-regular.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newText: "",
      todaysWeather: {
        weatherMain: "",
        weatherTemp: "",
        weatherDescription: "",
        city: "",
        country: "",
        icon: "",
        date: "",
        dayOrnight: "",
        time: ""
      },
      FiveDayForecast: {}
    };
    this.submit_button = this.submit_button.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillMount() {
    axios.get("http://localhost:8080/").then(res => {
      //res.data is now the new state
      this.setState({
        todaysWeather: {
          weatherTemp: res.data.weather.main.temp,
          weatherMain: res.data.weather.weather[0].main,
          weatherDescription: res.data.weather.weather[0].description,
          city: res.data.weather.name,
          country: res.data.weather.sys.country,
          icon: res.data.weather.weather[0].id,
          date: res.data.weather.dt.date,
          dayOrnight: res.data.weather.weather[0].icon.slice(-1),
          time: res.data.weather.dt.time
        },
        FiveDayForecast: res.data.forecast
      });
    });
  }

  submit_button(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/result", {
        city: this.state.newText
      })
      .then(res => {
        this.setState({
          todaysWeather: {
            weatherTemp: res.data.weather.main.temp,
            weatherMain: res.data.weather.weather[0].main,
            weatherDescription: res.data.weather.weather[0].description,
            city: res.data.weather.name,
            country: res.data.weather.sys.country,
            icon: res.data.weather.weather[0].id,
            date: res.data.weather.dt.date,
            dayOrnight: res.data.weather.weather[0].icon.slice(-1),
            time: res.data.weather.dt.time
          },
          FiveDayForecast: res.data.forecast
        });
      });
  }

  handleTextChange(e) {
    this.setState({
      newText: e.target.value
    });
  }

  render() {
    let forecastData = this.state.FiveDayForecast;
    let forecastCard;
    if (!forecastData.length == 0) {
      forecastCard = forecastData.map(data => {
        return (
          <ForecastCard icon={data.weather[0].id} temp={data.main.temp} date={data.dt_txt.slice(0, 4)} dayOrnight={data.weather[0].icon.slice(-1)}/>
        );
      });
    }
    console.log(forecastData);
    console.log(forecastCard);
    return (
      <div>
      <div className="container-fluid">
        <div className="row">
        <Search
          handleTextChange={this.handleTextChange}
          submit_button={this.submit_button}
          text={this.state.newText}
        />
        </div>
        </div>
        <div className="container-fluid">
          <div className="row weatherDisplay">
            <div className="col-lg-3 todaysWeather">
              <TodaysWeather
                weatherDescription={this.state.todaysWeather.weatherDescription}
                weatherMain={this.state.todaysWeather.weatherMain}
                weatherTemp={this.state.todaysWeather.weatherTemp}
                city={this.state.todaysWeather.city}
                country={this.state.todaysWeather.country}
                icon={this.state.todaysWeather.icon}
                date={this.state.todaysWeather.date}
                dayOrnight={this.state.todaysWeather.dayOrnight}
                time={this.state.todaysWeather.time}
              />
            </div>
            <div className="col-lg-9">
              <div className="fiveDayCard">
                <FiveDayForecast
                  card={forecastCard}

                />
              </div>
            </div>
          </div>
        <div className="row">
        <FiveDayForecastChart
          forecastData={forecastData}
          text={this.state.newText}
        />
        </div>
      </div>
      </div>
    );
  }
}

export default App;
