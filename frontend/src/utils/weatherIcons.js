import Sunny from './../assets/images/icon-sunny.webp';
import Storm from './../assets/images/icon-storm.webp';
import Snow from './../assets/images/icon-snow.webp';
import Rain from './../assets/images/icon-rain.webp';
import PartlyCloudy from './../assets/images/icon-partly-cloudy.webp';
import Overcast from './../assets/images/icon-overcast.webp';

export const weatherIcons = {
    0: Sunny, // Clear sky

    1: PartlyCloudy, // Mainly clear
    2: PartlyCloudy, // Partly cloudy

    3: Overcast, // Overcast

    45: Overcast, // Fog
    48: Overcast, // Depositing rime fog

    51: Rain, // Light drizzle
    53: Rain,
    55: Rain,

    61: Rain, // Slight rain
    63: Rain,
    65: Rain,

    71: Snow, // Snow fall
    73: Snow,
    75: Snow,

    77: Snow, // Snow grains

    80: Rain, // Rain showers
    81: Rain,
    82: Rain,

    85: Snow, // Snow showers
    86: Snow,

    95: Storm, // Thunderstorm
    96: Storm,
    99: Storm
};