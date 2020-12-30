import React from 'react'

import './styles.css';

const Weather = ({city, country, temp, info, desc}) => {
    const date = new Date();
    const localDateStr = date.toLocaleDateString();
    
    return (
        
        <div className="weather-info">
            <h1>{city}, {country}</h1>
            <p>{localDateStr}</p>
            <div className="temp">
                <h3>{Math.round(temp)}°C</h3>
            </div>
            <h4>{info}</h4>
            <h4>{desc}</h4>       
        </div>
        
    )
}

export default Weather
