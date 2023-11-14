import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_DRIVER = "GET_DRIVER";
export const GET_DRIVER_NAME = "GET_DRIVER_NAME";
export const GET_TEAMS = "GET_TEAMS";
export const GET_TEAMS_DRIVER = "GET_TEAMS_DRIVER";
export const POST_DRIVER = "POST_DRIVER";
export const GET_NATIONALITIES = "GET_NATIONALITIES"
export const GET_YEARS_OF_BIRTH = "GET_YEARS_OF_BIRTH";

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get("http://localhost:3001/drivers");
      const drivers = apiData.data.map((driver) => ({
        ...driver,
        yearOfBirth: new Date(driver.dob).getFullYear(),
      }));
      const nationalities = Array.from(new Set(drivers.map((driver) => driver.nationality)));
      const yearsOfBirth = Array.from(new Set(drivers.map((driver) => new Date(driver.dob).getFullYear())));
      const teamsdriver = Array.from(new Set(drivers.map((driver) => driver.teams)));

      dispatch({ type: GET_DRIVERS, payload: drivers });
      dispatch({ type: GET_NATIONALITIES, payload: nationalities });
      dispatch({ type: GET_YEARS_OF_BIRTH, payload: yearsOfBirth }); 
      dispatch({ type: GET_TEAMS_DRIVER, payload: teamsdriver }); 
    } catch (error) {
      console.error("Error al obtener conductores:", error);
    }
  };
};

export const getDriver = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/drivers/id/${id}`, {
        params: { id },
      });
      const driver = apiData.data;
      console.log("Driver by ID:", driver);
      dispatch({ type: GET_DRIVER, payload: driver });
      return driver; 
    } catch (error) {
      console.error("Error al buscar conductor por id:", error);
      throw error;
    }
  };
};

export const getDriverName = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/drivers/name", {
        params: { name },
      });
      const drivers = apiData.data;
      dispatch({ type: GET_DRIVER_NAME, payload: drivers });
      return drivers;
    } catch (error) {
      console.error("Error al buscar conductor por nombre:", error);
      throw error;
    }
  };
};

export const getTeams = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/teams");
      const teams = apiData.data;
      dispatch({ type: GET_TEAMS, payload: teams });
    } catch (error) {
      console.error("Error al obtener equipos:", error);
    }
  };
};

export const postDriver = (formData) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post("http://localhost:3001/drivers", formData);
      const driver = apiData.data;
      dispatch({ type: POST_DRIVER, payload: driver });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
};
