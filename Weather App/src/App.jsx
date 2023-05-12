import './App.css';
import weather from 'weather-gov-api';
import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import GetIcon from './GetIcon';
import CitySelector from './CitySelector';

export default function App() {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const periods = weatherData?.data?.properties?.periods;
  const [period, setPeriod] = useState(periods && periods.length > 0 ? periods[0] : null);
  const [cities, setCities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (city.length > 0) {
      weather.getForecast('default', city[0], city[1])
        .then(data => {
          if (data.data.properties && data.data.properties.forecast) {
            const forecastLink = data.data.properties.forecast
            weather.getForecastFromLink(forecastLink)
              .then(forecastData => {
                setWeatherData(forecastData);
              })
              .catch(err => console.log('error fetching forecast data', err));
          } else {
            setWeatherData(data);
          }
        })
        .catch(err => console.log('error fetching weather data', err));
    }
  }, [city]);

  useEffect(() => {

    if (periods && periods.length > 0) {
      setPeriod(periods[0]);
    }
  }, [periods]);






  return (

    <main>
      <div class="display">
        <div className="mainBodyDisplay">

          <div className="periodDisplay">
            {(periods && periods.length > 0) && periods.filter((newPeriod, index) => index % 2 === 0)
              .map((newPeriod, index) => {
                const isNight = newPeriod.name.includes('ight');
                const boxShadow = isNight ? "0px 5px 15px rgba(0, 0, 0, 0.9)" : "0px 0px 10px rgba(0, 0, 0, 0.25)"
                return (
                  <button
                    className="periodButton"
                    onClick={() => setPeriod(periods[index * 2])}
                    style={{
                      backgroundColor: isNight ? '#0a0e3f' : '#F2F7FF',
                      color: isNight ? 'white' : 'black',
                      boxShadow: period === newPeriod ? boxShadow : ''
                    }}
                  >
                    <div className="buttonTitle">{newPeriod.name.trim()}</div>
                    <GetIcon icon={newPeriod.icon} />
                  </button>
                );
              })}
          </div>

          <div className="getWeather">
            <h1>Simple Weather App</h1>
            <CitySelector city={city} setCity={setCity} cities={cities}
              setCities={setCities} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} />
            {period && <WeatherDisplay currentPeriod={period} />}
          </div>

          <div className="periodDisplay">
            {(periods && periods.length > 0) && periods.filter((newPeriod, index) => index % 2 !== 0)
              .map((newPeriod, index) => {
                const isNight = newPeriod.name.includes('ight');
                const boxShadow = isNight ? "0px 5px 15px rgba(0, 0, 0, 0.9)" : "0px 0px 10px rgba(0, 0, 0, 0.25)"
                return (
                  <button
                    className="periodButton"
                    onClick={() => setPeriod(periods[index * 2 + 1])}
                    style={{
                      backgroundColor: isNight ? '#0a0e3f' : '#F2F7FF',
                      color: isNight ? 'white' : 'black',
                      boxShadow: period === newPeriod ? boxShadow : ''
                    }}
                  >
                    <div className="buttonTitle">{newPeriod.name.trim()}</div>
                    <GetIcon icon={newPeriod.icon} />
                  </button>
                );
              })}
          </div>

        </div>
      </div>
    </main>

  );
}
