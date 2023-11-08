import Cards from "../Cards/Cards.jsx";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDrivers } from "../../redux/actions.js";


const HomePage = ({ drivers })=>{
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getDrivers());
  },[dispatch])

  return(
    <div>
    <h1>Esta es la vista de home</h1>
    <Cards drivers={drivers} />
  </div>
);
};
HomePage.propTypes = {
  drivers: PropTypes.array.isRequired, 
};

export default HomePage;
