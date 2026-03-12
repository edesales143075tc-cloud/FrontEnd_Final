// Weather API service - connects to OpenWeatherMap
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "your_api_key_here";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get current weather by city name
export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
};

// Get 5-day forecast by city name
export const getForecast = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Forecast not available");
  return response.json();
};

// Get weather by coordinates (geolocation)
export const getWeatherByCoords = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Location not found");
  return response.json();
};