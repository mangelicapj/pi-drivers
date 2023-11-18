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
  
  console.log("Romel:"+ driver.teams);
  console.log(driver);
  
  /*const teamsArray =
    Array.isArray(driver.Teams) && driver.Teams.length > 0
    ? driver.Teams.map((team) => {
        if (typeof team === 'string') {
          return team; // Para conductores existentes
        } else if (team.name) {
          return team.name; // Para conductores existentes
        } else if (team.DriverTeam && team.DriverTeam.name) {
          return team.DriverTeam.name; // Para conductores existentes con estructura diferente
        }
        return ''; // Ajusta según la estructura real de tus datos
      })
    : [];*/
 let teamsArray = [];

    if (driver.teams !== undefined){
      //drivers existentes
    teamsArray = driver.teams.split(',');
    } else if (driver.Teams !== undefined){
      //drivers creados
      teamsArray = Array.isArray(driver.Teams) && driver.Teams.length > 0
      ? driver.Teams.map((team) => {
        return team.name;
      }) :[];
    }else {
      // es otro 
    }
  
    return (
      <div className={styles['driver-info']}>
        <h1>Driver Details</h1>
        {driver ? (
          <div>
            <img
              className={styles['imageStyle']}
              src={
                driver.image?.url ||
                'https://static.vecteezy.com/system/resources/previews/004/595/959/non_2x/formula-one-driver-and-racing-car-with-halo-aka-head-guard-in-red-color-race-sport-competition-concept-cartoon-illustration-on-white-background-vector.jpg'
              }
              alt={`${driver.name?.forename} ${driver.surname?.surname}`}
            />
            <h2>ID: {driver.id}</h2>
            <h2>
              Name: {driver.name && typeof driver.name === 'object' ? driver.name.forename : driver.name}{' '}
              {driver.surname && typeof driver.surname === 'object' ? driver.surname.surname : driver.surname}
            </h2>
            <p>Nationality: {driver.nationality}</p>
            <p>DOB: {driver.dob}</p>
            <p>Description: {driver.description}</p>
            {teamsArray.length > 0 && (
              <div>
                <h3>Teams:</h3>
                <ul>
                  {teamsArray.map((team, index) => (
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
