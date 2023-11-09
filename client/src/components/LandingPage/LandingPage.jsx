import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';

const HOME = '/home'; 

const LandingPage = () => {
  return (
    <div className={`${styles['landing-page']} ${styles['background-image']}`}>
      <NavLink to={HOME}>
        <button className={styles['home-button']}>HOME</button>
      </NavLink>
    </div>
  );
}

export default LandingPage;