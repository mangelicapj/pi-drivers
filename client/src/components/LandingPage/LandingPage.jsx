import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={`${styles['landing-page']} ${styles['background-image']}`}>
      <button className={styles['home-button']}>HOME</button>
    </div>
  );
}

export default LandingPage;