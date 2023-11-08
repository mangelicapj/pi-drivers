import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_DRIVER = "GET_DRIVER";
export const GET_TEAMS = "GET_TEAMS";

export const getDrivers = () => {
  return async function (dispatch) {
    
      const apiData = await axios.get("http://localhost:3001/drivers");
      const drivers = apiData.data;
      dispatch({ type: GET_DRIVERS, payload: drivers });
    
  };
};

export const getDriver = (id, name) => {
  return async function (dispatch) {
    
      if (id) {
        const apiData = await axios.get(
          `http://localhost:3001/drivers/id/${id}`
        );
        const driver = apiData.data;
        dispatch({ type: GET_DRIVER, payload: driver });
      } else if (name) {
        const apiData = await axios.get(
          `http://localhost:3001/drivers/name?name=${name}`
        );
        const driver = apiData.data;
        dispatch({ type: GET_DRIVER, payload: driver });
      }
    
  };
};

export const getTeams = () => {
  return async function (dispatch) {
    
      const apiData = await axios.get("http://localhost:3001/teams");
      const teams = apiData.data;
      dispatch({ type: GET_TEAMS, payload: teams });
    
    }
  };
  