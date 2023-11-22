import { useState } from "react";
import { useDispatch } from "react-redux";
import {getDriverName, getDrivers } from "../../../redux/actions";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  console.log("Searching...");
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
  
      let results;
  
      if (searchTerm.trim() !== "") {
        const result = await dispatch(getDriverName(searchTerm));
          results = result.payload?.drivers || [];
        } else {
        // todos los drivers
        const result = await dispatch(getDrivers());
        results = result.payload || [];
      }
  
      // Extract names from objects if present
      const formattedResults = results.map((result) => ({
        ...result,
        name: result.name && typeof result.name === 'object' ? result.name.forename || result.name : result.name,
        surname: result.surname && typeof result.surname === 'object' ? result.surname.surname || result.surname : result.surname,
      }));
  
      console.log("Formatted Results:", formattedResults);
      onSearch(formattedResults);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setError("Error en la búsqueda. Inténtelo de nuevo.");
    }
    
  };
   
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.button} onClick={handleSearch}>
        Buscar
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;

