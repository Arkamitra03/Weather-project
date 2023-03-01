import React, { useState, useEffect } from "react";
function Temp() {
  const [city, setCity] = useState("Mumbai");
  const [buttonCity, setButtonCity] = useState(city);
  const [weatherData, setWeatherData] = useState("");

  function handleChange(event) {
    var val = event.target.value;
    setCity(val);
  }
  function buttonClick() {
    return setButtonCity(city);
  }
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${buttonCity}&appid=41562a6fa663497de0a473ee54ed9d87&units=metric`
      );

      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    };
    fetchApi();
  }, [buttonCity]);
  return (
    <div className="box">
      <div className="heading">
        <h1>Weather App</h1>
        <div className="image">
          <img
            src="https://cdn.icon-icons.com/icons2/2211/PNG/512/weather_sun_sunny_cloud_icon_134157.png"
            height={35}
            width={33}
          />
        </div>
      </div>

      <div className="inputField">
        <input type="search" name="inputBox" onChange={handleChange} />
        <button type="submit" onClick={buttonClick}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div>
        {weatherData.cod===200? 
          (<div className="text">
            <h1>{buttonCity}</h1>
            <h2>{weatherData.main.temp} °cel</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>
              min : {weatherData.main.temp_min} | max:
              {weatherData.main.temp_max}
            </p>
          </div>):
          (<div>
            <p style={{textAlign:"center"}}>No data found...try typing another city name</p>
          </div>
        ) }
      </div>
    </div>
  );
}
export default Temp;
