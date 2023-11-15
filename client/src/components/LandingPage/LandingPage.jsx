import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div>
      <div className={styles['background-image']}></div>
      <Link to="/home" className={styles['home-link']}>
        HOME
      </Link>
    </div>
  );
}

export default LandingPage;