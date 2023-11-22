import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Card.module.css';


const Card = ({ id, name, surname, image, teams }) => {
  if (typeof name !== 'string' || typeof surname !== 'string' || typeof image !== 'string') {
    return null;
  }

  let teamsArray = [];

    if (typeof teams === 'string' ){
      //drivers existentes
    teamsArray = teams.split(',');
    
    } else {
      //drivers creados
      teamsArray = Array.isArray(teams) && teams.length > 0
      ? teams.map((team) => {
        return team.name;
      }) :[];
      
    }
    return (
    <div className={styles['div']} id={id}>
      <Link to={`/detail/${id}`} className={styles['link']}>
        <img src={image} alt='' className={styles['imageStyle']} />
        <div>
          <h2 className={styles['nameStyle']}>Name: {name}</h2>
          <h2 className={styles['nameStyle']}>Surname: {surname}</h2>
        </div>
        {teamsArray && (
          <ul className={styles['data']}>
            <li>Teams: </li>
            {Array.isArray(teams) ? (
              teamsArray.map((team, index) => (
                <li key={index}>{team}</li>
              ))
            ) : (
              <li>{teams}</li>
            )}
          </ul>
        )} 
        
      </Link>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  teams: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
};

export default Card;

