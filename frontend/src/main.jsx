import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'
import WeatherProvider from './services/context/weather/weatherProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherProvider>
      <Header />
      <App />
    </WeatherProvider>
  </StrictMode>,
)
