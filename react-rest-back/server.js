const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const isoCountries = require("./javascript/country_code");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const API = "cb55b2623e5be3f70266d6101ee6b8e5";
const mainURL = "http://api.openweathermap.org/data/2.5/";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  let city = "toronto";
  currentWeather(city, weather => {
    fiveDayForcast(city, forecast=>{
      let data = {weather, forecast};
      res.json(data);
    })
  })
})

app.post("/result", (req, res) => {
  let cityName = req.body.city;
  currentWeather(cityName, weather => {
    fiveDayForcast(cityName, forecast =>{
      let data = {weather, forecast};
      res.json(data);
    })
  });
});

app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});

function currentWeather(city, callback) {
  axios
    .get(mainURL + "weather?q=" + city + "&units=metric&APPID=" + API)
    .then(response => {
      let data = response.data;
      data.dt = {date: dateConverter(data.dt), time: timeConverter(data.dt)};
      data.sys.country = getCountryName(data.sys.country);

      callback(data);
    });
}




function fiveDayForcast(city, callback) {
  axios
    .get(mainURL + "forecast?q=" + city + "&units=metric&APPID=" + API)
    .then(response => {
      let data = response.data;
      let fiveDayForcastData = data.list;
      //this is the array of my data;
      //each element has an object which displays the time of the weather;
      //must filter out all the data of each day with closest current time;
      let fiveDayForecastArray = [];
      // must filter out the ones with the same time as last

      for (let i = 1; i < fiveDayForcastData.length; i++) {

        fiveDayForcastData[i].dt_txt = filterDates(`${fiveDayForcastData[i].dt_txt} UTC`);
        if (i % 8 == 6) {
          fiveDayForecastArray.push(fiveDayForcastData[i])
        }
      }
      callback(fiveDayForecastArray);
    });
}

function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

function filterDates(UNIX_timestamp) {
  var date = new Date(UNIX_timestamp);
  return date.toString();
}

function dateConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = date + " " + month + " " + year;
  return time;
}

function timeConverter(UNIX_timestamp) {
  let today = new Date(UNIX_timestamp * 1000);
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  let pmOram;
  m = checkTime(m);
  s = checkTime(s);
  if (h > 12) {
    pmOram = "pm";
    h = h - 12;
  } else {
    pmOram = "am";
  }
  let time = `${h}:${m}:${s} ${pmOram}`;
  return time;
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
