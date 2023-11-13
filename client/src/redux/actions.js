import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_DRIVER = "GET_DRIVER";
export const GET_DRIVER_NAME = "GET_DRIVER_NAME";
export const GET_TEAMS = "GET_TEAMS";
export const POST_DRIVER = "POST_DRIVER";

export const getDrivers = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/drivers");
      const drivers = apiData.data;
      dispatch({ type: GET_DRIVERS, payload: drivers });
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
      console.log("Driver by ID:", driver); // Agregamos este log
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
