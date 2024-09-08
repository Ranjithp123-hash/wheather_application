import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FaSearch, FaCity, FaGlobe, FaClock, FaUsers } from 'react-icons/fa'; 

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [filteredCities, setFilteredCities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const fetchCities = async (start = 0, limit = 100) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&sort=name&start=${start}&rows=${limit}`
      );
      const newCities = response.data.records.map((record) => ({
        name: record.fields.name,
        country: record.fields.cou_name_en,
        timezone: record.fields.timezone,
        population: record.fields.population,
        longitude: record.fields.longitude,
        latitude: record.fields.latitude,
      }));
      setCities((prevCities) => [...prevCities, ...newCities]);
      if (newCities.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setError("Network error: Failed to fetch cities. Please check your connection.");
    } finally {
        console.log(loading)
      setLoading(false); 
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredCities([]);
    } else {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        city.country.toLowerCase().includes(event.target.value.toLowerCase()) 
      );
      setFilteredCities(filtered);
    }
  };

  useEffect(() => {
    fetchCities();
  
    // eslint-disable-next-line
    }, [searchTerm, cities]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">City Explorer</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="input-group mb-4">
        <span className="input-group-text bg-primary text-white"><FaSearch /></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a city or country..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <InfiniteScroll
        dataLength={cities.length}
        next={() => fetchCities(cities.length)}
        hasMore={hasMore}
        loader={
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        endMessage={<p className="text-center">No more cities to display.</p>}
      >
        <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr>
              <th><FaCity className="me-1" />City</th>
              <th><FaGlobe className="me-1" />Country</th>
              <th><FaClock className="me-1" />Timezone</th>
              <th><FaUsers className="me-1" />Population</th>
            </tr>
          </thead>
          <tbody>
            {(searchTerm ? filteredCities : cities).map((city, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/weather/${city.name}/${city.country}`}
                    target="_self"
                    className="text-decoration-none"
                  >
                    {city.name}
                  </Link>
                </td>
                <td>{city.country}</td>
                <td>{city.timezone}</td>
                <td>{city.population.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CityTable;
