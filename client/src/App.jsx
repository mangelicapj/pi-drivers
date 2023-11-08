import { useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.css';
import { LandingPage, HomePage, DetailPage, FormPage } from './components/indexviews';
import Nav from './components/Nav/Nav';
import axios from 'axios';


function App() {
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/drivers');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error al obtener los conductores:', error);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);
  return (
    <div className='App' id={styles.mainView}>
       {location.pathname !== "/" && <Nav />}
    <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage drivers={drivers} />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/create" element={<FormPage />} />
        </Routes>
      </div>
    
  )
}

export default App;





