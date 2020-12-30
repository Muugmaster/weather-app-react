import { useState } from 'react';

import Weather from "./components/Weather";

import './styles.css';


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const API_URL = `${process.env.REACT_APP_API_BASE_URL}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`

  const search = async event => {
    if (event.key === "Enter") {
        const result = await fetch(API_URL)
        const data = await result.json();
        setQuery('');
        setWeather(data);
    }
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
