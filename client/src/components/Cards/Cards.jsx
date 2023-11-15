import PropTypes from 'prop-types';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import Paginado from '../HomePage/Paginado/Paginado';

const Cards = ({ currentPage, driversPerPage, handlePageChange, filteredDrivers }) => {
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <div className={styles.container}>
    {currentDrivers.map((driver) => (
      <Card
        key={String(driver.id)} 
        id={String(driver.id)}   
        name={typeof driver.name === 'object' ? driver.name.forename : driver.name}
        surname={typeof driver.surname === 'object' ? driver.surname.surname : driver.surname}
        description={driver.description}
        image={driver.image.url}
        nationality={driver.nationality}
        dob={driver.dob}
        teams={driver.teams}
      />
    ))}
      <Paginado
        totalPages={Math.ceil(filteredDrivers.length / driversPerPage)}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        driversPerPage={driversPerPage}
        totalDrivers={filteredDrivers.length}
      />
    </div>
  );
};

Cards.propTypes = {
  currentPage: PropTypes.number.isRequired,
  driversPerPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  filteredDrivers: PropTypes.array.isRequired,
};

export default Cards;
