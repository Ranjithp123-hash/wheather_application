import  { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (city) => {
    if (!favorites.some((fav) => fav.name === city.name)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((fav) => fav.name !== city.name));
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
