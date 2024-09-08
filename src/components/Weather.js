import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FaTemperatureHigh, FaWind, FaTint, FaCloudSun } from 'react-icons/fa'; 

const WeatherPage = () => {
  const { city, country } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "3ecc39f16a8c81b3a1a7756fe1d50844"; 
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [city, country]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container my-5">
      <h1 className="my-4 text-center">Weather in {city}, {country}</h1>
      {weatherData && (
        <div className="card shadow-lg">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">
              <FaCloudSun className="me-2" style={{ color: '#f39c12' }} />
              {weatherData.weather[0].main} ({weatherData.weather[0].description})
            </h5>
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <FaTemperatureHigh className="mb-1" style={{ color: '#e74c3c', fontSize: '1.5rem' }} />
                <p className="mb-0">Temperature: {weatherData.main.temp} °C</p>
                <small>Feels like: {weatherData.main.feels_like} °C</small>
              </div>
              <div className="col-md-4 mb-3">
                <FaTint className="mb-1" style={{ color: '#3498db', fontSize: '1.5rem' }} />
                <p className="mb-0">Humidity: {weatherData.main.humidity}%</p>
              </div>
              <div className="col-md-4 mb-3">
                <FaWind className="mb-1" style={{ color: '#2ecc71', fontSize: '1.5rem' }} />
                <p className="mb-0">Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
              <div className="col-md-4 mb-3">
                <i className="bi bi-cloud-haze2" style={{ color: '#f39c12', fontSize: '1.5rem' }}></i>
                <p className="mb-0">Pressure: {weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
