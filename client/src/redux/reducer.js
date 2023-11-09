import { GET_DRIVERS, GET_TEAMS } from "./actions";

const initialState = {
  drivers: [],
  teams: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return { ...state, drivers: action.payload };
    case GET_TEAMS:
      return { ...state, teams: action.payload };
    default:
      return state; // Deja el estado sin cambios para otras acciones
  }
};

export default rootReducer;
