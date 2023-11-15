import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions.js";
import SearchBar from "../Nav/SearchBar/SearchBar";
import Cards from "../Cards/Cards.jsx";
import Filters from "./Filter/Filters.jsx";
import Paginado from "./Paginado/Paginado.jsx";
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
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;

  const applyFilters = useCallback(
    (team, nationality, sortBy, yearOfBirth) => {
      setSelectedTeam(team);
      setSelectedNationality(nationality);
      setSelectedSortBy(sortBy);
      setSelectedYearOfBirth(yearOfBirth);

      let filtered = drivers;

      if (team) {
        const filteredDriversByTeam = drivers.filter(driver =>
          driver.teams && driver.teams.includes(team)
        );
        filtered = filteredDriversByTeam;
      }

      if (nationality) {
        filtered = filtered.filter((driver) => driver.nationality === nationality);
      }

      if (yearOfBirth) {
        filtered = filtered.filter((driver) => driver.yearOfBirth === parseInt(yearOfBirth));
      }

      if (sortBy) {
        filtered.sort((a, b) => {
          const nameA = a.name.forename || ""; // Si es undefined, asignamos una cadena vacía
          const nameB = b.name.forename || "";
      
          return sortBy === "Ascendente"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
      }

      setFilteredDrivers(filtered);
      setCurrentPage(1);
    },
    [drivers, teamsWithDrivers]
  );

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, [dispatch]);

  const handleSearch = async (results) => {
    setSearchResults(results.map((result) => ({
      id: Number(result.id), 
      name: result.name?.forename || "",
      surname: result.surname?.surname || "",
    })));
  };

  useEffect(() => {
    applyFilters(selectedTeam, selectedNationality, selectedSortBy, selectedYearOfBirth);
  }, [applyFilters, selectedTeam, selectedNationality, selectedSortBy, selectedYearOfBirth, drivers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`${styles["home-page"]} ${styles["pagination"]}`}>
      <Filters className={styles["filter-section"]} teams={teams || []} nationality={nationality || []} onFilterChange={applyFilters} />
      <SearchBar className={styles["search-bar"]} onSearch={handleSearch} />

      <Cards
        className={styles['driver-card']}
        currentPage={currentPage}
        driversPerPage={driversPerPage}
        searchResults={searchResults}
        handlePageChange={handlePageChange}
        filteredDrivers={filteredDrivers}
      />
      <Paginado totalPages={Math.ceil(filteredDrivers.length / driversPerPage)} onPageChange={handlePageChange} currentPage={currentPage} driversPerPage={driversPerPage} totalDrivers={filteredDrivers.length} />
    </div>
  );
};

HomePage.propTypes = {
  drivers: PropTypes.array.isRequired,
};

export default HomePage;
