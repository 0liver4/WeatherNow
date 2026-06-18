import axios from 'axios';


export const weatherApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1/forecast',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const geoApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1/search',
  headers: {
    'Content-Type': 'application/json',
  },
});

