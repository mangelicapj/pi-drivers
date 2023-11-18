import PropTypes from 'prop-types';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import Paginado from '../HomePage/Paginado/Paginado';

const Cards = ({ currentPage, driversPerPage, handlePageChange, filteredDrivers }) => {
  console.log("Filtered Drivers in Cards:", filteredDrivers);

  if (!filteredDrivers || filteredDrivers.length === 0) {
    return <p>No drivers found.</p>;
  }

  const lastPage = Math.ceil(filteredDrivers.length / driversPerPage);
  const currentPageSafe = Math.min(currentPage, lastPage);
  const indexOfLastDriver = currentPageSafe * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <div className={styles['container']} >
      {currentDrivers.map((driver) => {
        console.log("Rendering Driver ID:", driver.id);
        return (
          <Card
          key={driver.id}
          id={driver.id}
          name={driver.name && typeof driver.name === 'object' ? driver.name.forename : driver.name}
          surname={driver.surname && typeof driver.surname === 'object' ? driver.surname.surname : driver.surname}
          description={driver.description || ''}
          image={typeof driver.image === 'string' ? driver.image : (driver.image && driver.image.url) || 'https://static.vecteezy.com/system/resources/previews/004/595/959/non_2x/formula-one-driver-and-racing-car-with-halo-aka-head-guard-in-red-color-race-sport-competition-concept-cartoon-illustration-on-white-background-vector.jpg'}
          nationality={driver.nationality || ''}
          dob={driver.dob || ''}
          teams={driver.teams || driver.Teams} 
        />
        );
      })}
      <Paginado
        totalPages={lastPage}
        onPageChange={handlePageChange}
        currentPage={currentPageSafe}
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
