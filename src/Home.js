import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
  const [data, setData] = useState({
    name: 'London',
    celsius: 10,
    humidity: 10,
    speed: 2,
  });

  const [name, setName] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f002581ac0c2f450084cc1fd41338616&units=metric`;
      axios.get(apiUrl)
        .then(response => {
          setData({
            ...data,
            celsius: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
          });
        })
        .catch(errore => console.log(errore));
    }
  }

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input
            type='text'
            placeholder='Cerca la tua città...'
            onChange={e => setName(e.target.value)}
          />
          <button>
            <img src='/images/search.png' alt='ricerca' onClick={handleClick} />
          </button>
        </div>
        <div className='winfo'>
          <img src='/images/weather.png' alt='vento' />
          <div className='temperature'>
            <h1>{Math.round(data.celsius)}°C</h1>
            <h2>{data.name}</h2>
          </div>
        </div>
        <div className='details'>
          <div className='col'>
            <img src='/images/humidity.png' alt='humidity' />
            <div className='humidity'>
              <p>{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className='col'>
            <img src='/images/wind.png' alt='wind' />
            <div className='wind'>
              <p>{Math.round(data.speed)} km/h</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
