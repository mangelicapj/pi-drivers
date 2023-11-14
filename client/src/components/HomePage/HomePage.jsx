import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions.js";
import SearchBar from "../Nav/SearchBar/SearchBar";
import Cards from "../Cards/Cards.jsx";
import Filters from "./Filter/Filters.jsx";
import PropTypes from "prop-types";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const teams = useSelector((state) => state.teams);
  const nationality = useSelector((state) => state.nationality);
  const teamsWithDrivers = useSelector((state) => state.teamsdriver); 

  const [searchResults, setSearchResults] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const [selectedYearOfBirth, setSelectedYearOfBirth] = useState(null);

  const applyFilters = useCallback(
    (team, nationality, sortBy, yearOfBirth) => {
      setSelectedTeam(team);
      setSelectedNationality(nationality);
      setSelectedSortBy(sortBy);
      setSelectedYearOfBirth(yearOfBirth);
  
      let filtered = drivers;
  
      if (team) {
        const selectedTeam = teamsWithDrivers.find((t) => t.name === team);
        filtered = selectedTeam ? selectedTeam.drivers : [];
      }
  
      if (nationality) {
        filtered = filtered.filter((driver) => driver.nationality === nationality);
      }
  
      if (yearOfBirth) {
        filtered = filtered.filter((driver) => driver.yearOfBirth === parseInt(yearOfBirth));
      }
  
      if (sortBy) {
        filtered.sort((a, b) =>
          sortBy === "Ascendente"
            ? a.name.forename.localeCompare(b.name.forename)
            : b.name.forename.localeCompare(a.name.forename)
        );
      }
  
      setFilteredDrivers(filtered);
    },
    [drivers, teamsWithDrivers]
  );

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    applyFilters(selectedTeam, selectedNationality, selectedSortBy, selectedYearOfBirth);
  }, [applyFilters, selectedTeam, selectedNationality, selectedSortBy, selectedYearOfBirth, drivers]);


  return (
    <div className={`${styles["home-page"]} ${styles["pagination"]}`}>
      <Filters className={styles["filter-section"]} teams={teams || []} nationality={nationality || []} onFilterChange={applyFilters} />
      <SearchBar className={styles["search-bar"]} onSearch={handleSearch} />

      {filteredDrivers && Array.isArray(filteredDrivers) && filteredDrivers.length > 0 && (
        <Cards
          className={styles["driver-card"]}
          drivers={searchResults && searchResults.length > 0 ? searchResults : filteredDrivers}
          selectedTeam={selectedTeam}
        />
      )}
    </div>
  );
};
HomePage.propTypes = {
  drivers: PropTypes.array.isRequired,
};

export default HomePage;
