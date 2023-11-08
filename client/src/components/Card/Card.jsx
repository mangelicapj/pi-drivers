import styles from "./Card.module.css";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Card = ({ id, name, surname, description, image, nationality, dob, teams }) => {
  if (typeof name !== 'string' || typeof surname !== 'string' || typeof image !== 'string') {
    
    return null;
  }

  return (
    <div className={styles['div']} id={id}>
      <button>❌</button>
      <img src={image} alt='' className={styles['imageStyle']} />
      <Link to={`/detail/${id}`}>
        <div>
          <h2 className={styles['nameStyle']}> Name: {name} | {id}</h2>
          <h2 className={styles['nameStyle']}> Surname: {surname}</h2>
        </div>
        <p className={styles['data']}> Description: {description}</p>
        <p className={styles['data']}>Teams: {teams}</p>
        <p className={styles['data']}>DOB: {dob}</p>
        <h2 className={styles['data']}>Nationality: {nationality}</h2>
               
      </Link>
    </div>
  );
}


Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  nationality: PropTypes.string,
  dob: PropTypes.string,
  teams: PropTypes.string,
};

export default Card;





