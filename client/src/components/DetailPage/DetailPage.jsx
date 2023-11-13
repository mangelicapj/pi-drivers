import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDriver } from '../../redux/actions';
import styles from './DetailPage.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driver);

  useEffect(() => {
    dispatch(getDriver(id));
  }, [dispatch, id]);

  return (
    <div className={styles['driver-info']}>
      <h1>Driver Details</h1>
      {driver ? (
        <div>
          <img className={styles['imageStyle']} src={driver.image?.url} alt={`${driver.name?.forename} ${driver.surname?.surname}`} />
          <h2>Name: {driver.name?.forename} {driver.surname?.surname}</h2>
          <p>Nationality: {driver.nationality}</p>
          <p>DOB: {driver.dob}</p>
          <p>Description: {driver.description}</p>
          {Array.isArray(driver.teams) && driver.teams.length > 0 && (
            <div>
              <h3>Teams:</h3>
              <ul>
                {driver.teams.map((team, index) => (
                  <li key={index}>{team}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
