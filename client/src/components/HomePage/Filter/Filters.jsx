import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector} from "react-redux";
import { getDrivers} from "../../../redux/actions";
import styles from "./Filters.module.css";

const Filters = ({ teams, nationality, onFilterChange }) => {
  const dispatch = useDispatch();
  const [filterByTeam, setFilterByTeam] = useState("");
  const [filterByNationality, setFilterByNationality] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterByYearOfBirth, setFilterByYearOfBirth] = useState("");

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  useEffect(() => {
    onFilterChange(filterByTeam, filterByNationality, sortBy, filterByYearOfBirth);
  }, [filterByTeam, filterByNationality, sortBy, filterByYearOfBirth, onFilterChange]);

  const yearsOfBirth = useSelector((state) => state.yearsOfBirth);

  const handleFilterByTeam = (team) => {
    const filteredTeam = team === "" ? null : team;
    onFilterChange(filteredTeam, filterByNationality, sortBy, filterByYearOfBirth);
    setFilterByTeam(team);
    setFilterByNationality("");
    setFilterByYearOfBirth("");
  };

  const handleFilterByNationality = (nationality) => {
    const filteredNationality = nationality === "" ? null : nationality;
    onFilterChange(filterByTeam, filteredNationality, sortBy, filterByYearOfBirth);
    setFilterByNationality(nationality);
    setFilterByTeam("");
    setSortBy("");
    setFilterByYearOfBirth("");
  };

  const handleOrder = (order) => {
    setSortBy(order.target.value);
  };

  const handleFilterByYearOfBirth = (yearOfBirth) => {
    const filteredYearOfBirth = yearOfBirth === "" ? null : yearOfBirth;
    onFilterChange(filterByTeam, filterByNationality, sortBy, filteredYearOfBirth);
    setFilterByYearOfBirth(yearOfBirth);
    setFilterByTeam("");
    setFilterByNationality("");
    setSortBy("");
  };

  return (
    <div className={`${styles['contenedor-filtros']} ${styles['filtro']}`}>
      <select onChange={handleOrder} value={sortBy}>
        <option value="">Ordenar</option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <select onChange={(e) => handleFilterByTeam(e.target.value)} value={filterByTeam}>
        <option value="">Teams</option>
        {teams.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => handleFilterByNationality(e.target.value)} value={filterByNationality}>
        <option value="">Nationality</option>
        {nationality.map((n, index) => (
          <option key={index} value={n}>
            {n}
          </option>
        ))}
        <option value="Ninguna">Ninguna nacionalidad</option>
      </select>
      <select onChange={(e) => handleFilterByYearOfBirth(e.target.value)} value={filterByYearOfBirth}>
            <option value="">yearOfBirth</option>
            {yearsOfBirth
                .sort((a, b) => a - b)
                .map((year, index) => (
                <option key={index} value={year ? year.toString() : ""}>
                    {year}
                </option>
                ))}
            <option value="Ninguno">Ninguno</option>
            </select>
    </div>
  );
};

Filters.propTypes = {
  teams: PropTypes.array,
  nationality: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
