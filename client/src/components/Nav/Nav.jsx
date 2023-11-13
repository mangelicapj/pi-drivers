import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <div className={styles['mainContainer']}>
      <Link className={`${styles['mainContainer a ']} ${styles['mainContainer a:hover']}`} to="/home">HOME</Link>
      <Link className={`${styles['mainContainer a ']} ${styles['mainContainer a:hover']}`} to="/create">CREATE DRIVER</Link>
    </div>
  );
}

export default Nav;