import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CitySelector({ city, setCity, cities, setCities, currentLocation, setCurrentLocation }) {
  // const [cities, setCities] = useState([]);
  // const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: {
          countryIds: 'US',
          minPopulation: '1000000',
           limit: '10'
        },
        headers: {
          'X-RapidAPI-Key': 'a6cdb6efaamshced4bbd875493acp1cfe41jsnf45e5dd0ff6e',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log('cities,', response.data.data)
        setCities(response.data.data);
       
        setCity([response.data.data[0].latitude, response.data.data[0].longitude]);
      } catch (error) {
        console.error('Error getting city list', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    };

    const errorCallback = (error) => {
      console.error('Error getting location: ', error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const handleChange = (event) => {
    const cords = event.target.value;
    const latitude = Number(cords.split(',')[0]);
    const longitude = Number(cords.split(',')[1]);
    setCity([latitude, longitude]);
  };

  const handleSelectLocation = () => {
    if (currentLocation) {
      setCity(currentLocation);
    }
  };
  
  return (
    <div class="selectHolder">
      <h4>PICK LOCATION</h4>
      <select class="my-select" value={city} onChange={handleChange}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.id} value={[city.latitude, city.longitude]}>
            {city.city}
          </option>
        ))}
        {currentLocation && (
          <option key={"currentLoc"} value={[currentLocation[0],                         currentLocation[1]]} >
            Current Location
          </option>
        )}
      </select>
    </div>
  );
}
