import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions.js";
import SearchBar from "../Nav/SearchBar/SearchBar";
import Cards from "../Cards/Cards.jsx";
import PropTypes from "prop-types";
import styles from "./HomePage.module.css"

const HomePage = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const teams = useSelector((state) => state.teams);
  const [searchResults, setSearchResults] = useState([]);
  const [filterByTeam, setFilterByTeam] = useState(null);
  const [filterByNationality, setFilterByNationality] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleFilterByTeam = (team) => {
    setFilterByTeam(team);
    setFilterByNationality(null);
  };

  const handleFilterByNationality = (nationality) => {
    setFilterByNationality(nationality);
    setFilterByTeam(null);
  };

  const handleOrder = (order) => {
    setSortBy(order.target.value);
  };

  const filteredDrivers = drivers
    .filter((driver) => (filterByTeam ? driver.teams.includes(filterByTeam) : true))
    .filter((driver) =>
      filterByNationality ? driver.nationality === filterByNationality : true
    )
    .sort((a, b) => {
      if (sortBy === "Ascendente") {
        return a.name.forename.localeCompare(b.name.forename);
      } else if (sortBy === "Descendente") {
        return b.name.forename.localeCompare(a.name.forename);
      } else {
        return 0;
      }
    });

  return (
    <div className={`${styles['home-page']} ${styles['pagination']}`} >
      <select className={`${styles['filter-section']} ${styles['filter-button']}`} onChange={handleOrder}>
        <option value="">Ordenar</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <select className={`${styles['filter-section']} ${styles['filter-button']}`}  onChange={(e) => handleFilterByTeam(e.target.value)}>
        <option value="">Todos los equipos</option>
        {teams.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select className={`${styles['filter-section']} ${styles['filter-button']}`}  onChange={(e) => handleFilterByNationality(e.target.value)}>
        <option value="">Todas las nacionalidades</option>
        {[...new Set(drivers.map((driver) => driver.nationality))].map((nationality, index) => (
          <option key={index} value={nationality}>
            {nationality}
          </option>
        ))}
      </select>
      <SearchBar className={styles['search-bar']} onSearch={handleSearch} />
      <Cards className={styles['driver-card']} drivers={searchResults.length > 0 ? searchResults : filteredDrivers} />
    </div>
  );
};

HomePage.propTypes = {
  drivers: PropTypes.array.isRequired,
};

export default HomePage;

