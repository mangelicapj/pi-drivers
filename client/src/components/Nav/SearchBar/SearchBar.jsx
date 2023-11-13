import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDriver, getDriverName, getDrivers } from "../../../redux/actions";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
  
      let results;
      if (searchTerm.trim() !== "") {
        if (!isNaN(searchTerm)) {
          const result = await dispatch(getDriver(searchTerm));
          console.log("Driver by ID:", result);
  
          if (result && result.payload) {
            // Si se encuentra un conductor por ID, establecer results como un array con ese conductor
            results = [result.payload];
          } else {
            // Si no se encuentra el conductor, establecer results como un array vacío
            results = [];
          }
        } else {
          const result = await dispatch(getDriverName(searchTerm));
          console.log("Driver by Name:", result);
          results = result.payload || [];
        }
      } else {
        const result = await dispatch(getDrivers());
        console.log("All Drivers:", result);
        results = result.payload || [];
      }
  
      console.log("Final Results:", results);
      setSearchTerm("");
      onSearch(results);
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
        placeholder="Buscar por nombre o ID"
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
