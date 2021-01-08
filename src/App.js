import { useState } from 'react';

import Weather from "./components/Weather";

import './styles.css';


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  useState(() => {
    if (navigator.geolocation) {
      window.navigator.geolocation
          .getCurrentPosition(success, console.error)
    }
  }, [])

  const fetchWeather = async (city) => {
      const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      const data = await result.json();
      setWeather(data);
  }

  const search = async event => {
    if (event.key === "Enter") {
        const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        const data = await result.json();
        setQuery('');
        setWeather(data);
    }
  }

  function reverseGeocode(latitude, longitude) {
    let geoAPI = process.env.REACT_APP_GEO_API_KEY;

    fetch('https://api.opencagedata.com/geocode/v1/json'
        + '?'
        + 'key=' + geoAPI
        + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        + '&pretty=1'
        + '&no_annotations=1')
     .then((response) => response.json())
     .then((data) => fetchWeather(data.results[0].components.city));
}


  function success(data) {
    // extracting the latitude and longitude from the data
    let latitude = data.coords.latitude;
    let longitude = data.coords.longitude;
    // reverse geocode
    reverseGeocode(latitude, longitude);
  }


  return (   
    <>
    {(typeof weather.main != "undefined") ? (
      <div className="container">
        <input type="text" placeholder="Enter city..."  onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        <Weather city={weather.name} country={weather.sys.country} temp={weather.main.temp} info={weather.weather[0].main} desc={weather.weather[0].description} />
      </div>
    ) : (
      <div className="container">
        <h1 className="loading">Enter city 👊</h1>
        <input type="text" placeholder="Enter city..."  onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
      </div>
    )}
    </>
    
  );
  
}

export default App;
