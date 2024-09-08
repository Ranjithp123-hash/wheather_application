import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTable from "./components/CitiesTable";
import WeatherPage from "./components/Weather";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CityTable />} />
          <Route path="/weather/:city/:country" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
