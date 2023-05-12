import React, { useState,useEffect } from'react';

export default function GetIcon({icon}) {
    const labels = {
      "skc": "Fair/clear",
      "few": "A few clouds",
      "sct": "Partly cloudy",
      "bkn": "Mostly cloudy",
      "ovc": "Overcast",
      "wind_skc": "Fair/clear and windy",
      "wind_few": "A few clouds and windy",
      "wind_sct": "Partly cloudy and windy",
      "wind_bkn": "Mostly cloudy and windy",
      "wind_ovc": "Overcast and windy",
      "snow": "Snow",
      "rain_snow": "Rain/snow",
      "rain_sleet": "Rain/sleet",
      "snow_sleet": "Snow/sleet",
      "fzra": "Freezing rain",
      "rain_fzra": "Rain/freezing rain",
      "snow_fzra": "Freezing rain/snow",
      "sleet": "Sleet",
      "rain": "Rain",
      "rain_showers": "Rain showers (high cloud cover)",
      "rain_showers_hi": "Rain showers (low cloud cover)",
      "tsra": "Thunderstorm (high cloud cover)",
      "tsra_sct": "Thunderstorm (medium cloud cover)",
      "tsra_hi": "Thunderstorm (low cloud cover)",
      "tornado": "Tornado",
      "hurricane": "Hurricane conditions",
      "tropical_storm": "Tropical storm conditions",
      "dust": "Dust",
      "smoke": "Smoke",
      "haze": "Haze",
      "hot": "Hot",
      "cold": "Cold",
      "blizzard": "Blizzard",
      "fog": "Fog/mist"
    };
  
function getLastMatchingKey(str) {
  const labelKeys = Object.keys(labels).reverse();
  for (const key of labelKeys) {
    if (str.includes(key)) {
      return key;
    }
  }
  return "";
}
const labelKey = getLastMatchingKey(icon);
  
  return (
    <div class="iconDisplay" >
      <img style={{width: '70px', maxHeight: '70px'}} src=                          {`/WeatherIcons/${labelKey}.png`} alt={labelKey} /> 
    </div>
  )
};