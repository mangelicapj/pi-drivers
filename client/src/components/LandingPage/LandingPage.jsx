import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={`${styles['landing-page']} ${styles['background-image']}`}>
    <Link to={"/home"}>
        
        <button className={styles['home-button']} type="button">HOME</button>
       
      </Link>
    </div>
  );
}

export default LandingPage;