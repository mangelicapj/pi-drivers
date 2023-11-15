import PropTypes from 'prop-types';
import styles from './Paginado.module.css';

const Paginado = ({ currentPage, onPageChange, driversPerPage, totalDrivers }) => {
  const totalPages = Math.ceil(totalDrivers / driversPerPage);

  return (
    <div className={styles['mainView']}>
      <button onClick={() => onPageChange(currentPage - 1)} 
      className={styles['leftArrow']} 
      alt="Previous Page" 
      disabled={currentPage === 1}>
        ←
      </button>
      <div className={styles['pagesBox']}>
        <div className={styles['pagesSubBox']}>
          <p>
            {`${currentPage} de ${totalPages}`}
          </p>
        </div>
      </div>
      <button onClick={() => onPageChange(currentPage + 1)}
       className={styles['rightArrow']} 
       alt="Next Page" 
       disabled={currentPage === totalPages}>
        →
      </button>
    </div>
  );
};

Paginado.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  driversPerPage: PropTypes.number.isRequired,
  totalDrivers: PropTypes.number.isRequired,
};

export default Paginado;