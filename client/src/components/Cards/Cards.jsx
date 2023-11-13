import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = () => {
  const drivers = useSelector((state) => state.drivers);

  return (
    <div className={styles.container}>
      {drivers.map((driver) => (
        <Card
          key={driver.id}
          id={driver.id}
          name={driver.name.forename} 
          surname={driver.surname.surname} 
          description={driver.description}
          image={driver.image.url} 
          nationality={driver.nationality}
          dob={driver.dob}
          teams={driver.teams}
        />
      ))}
    </div>
  );
};

export default Cards;

