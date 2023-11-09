import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <div className={styles['mainContainer']}>
      <Link to="/home">HOME</Link>
      <Link to="/create">CREATE DRIVER</Link>
    </div>
  );
}

export default Nav;