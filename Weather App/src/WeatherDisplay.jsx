import './App.css';
import GetIcon from './GetIcon';

function WeatherDisplay({currentPeriod}) {

  const {
    number,
    name,
    startTime,
    endTime,
    isDaytime,
    temperature,
    temperatureUnit,
    temperatureTrend,
    probabilityOfPrecipitation,
    dewpoint,
    relativeHumidity,
    windSpeed,
    windDirection,
    icon,
    shortForecast,
    detailedForecast,
    } = currentPeriod;

return (
  <div class="period">
    <h4>{name}'s Weather</h4>
    <div class="tempAndIcon">
      <div class="tempDisplay">{temperature}&deg;</div>
      <GetIcon icon={currentPeriod.icon}/>
    </div>
    <div>
      <div className="otherIcons">
        <div class="iconDisplay" >
          <img style={{width: '50px'}} src='./WeatherIcons/humidity.png'  alt={icon} /> 
        </div>
        <div className="text">
          {relativeHumidity.value}%
        </div>
      </div>
      <div className="otherIcons">
        <div class="iconDisplay" >
          <img style={{width: '50px'}} src='./WeatherIcons/rain.png' alt={icon} /> 
        </div>
        <div className="text">
          {probabilityOfPrecipitation.value ?                                           probabilityOfPrecipitation.value : 0}%
        </div>
      </div>
      <div className="otherIcons">
        <div class="iconDisplay" >
          <img style={{width: '50px'}} src='./WeatherIcons/wind_bkn.png'  alt={icon} /> 
        </div>
        <div className="text">
          {windSpeed} {windDirection}
        </div>
      </div>
    </div>
  </div>
  );
  };

export default WeatherDisplay;
