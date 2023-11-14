import { GET_DRIVERS, GET_TEAMS, GET_DRIVER, POST_DRIVER, GET_DRIVER_NAME, GET_NATIONALITIES, GET_YEARS_OF_BIRTH, GET_TEAMS_DRIVER} from "./actions";

const initialState = {
  drivers: [],
  teams: [],
  driver: {},
  detail: {},
  nationality: [],
  yearsOfBirth: [], 
  teamsdriver:[],
  filters: {
    teamFilter: null,
    originFilter: null,
  },
  sortOrder: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return { ...state, drivers: action.payload };
    case GET_TEAMS:
      return { ...state, teams: action.payload };
    case GET_DRIVER:
      return { ...state, driver: action.payload };
    case GET_DRIVER_NAME:
      return { ...state, drivers: action.payload };
    case POST_DRIVER:
      return { ...state, driver: action.payload };
    case GET_NATIONALITIES:
      return { ...state, nationality: action.payload };
    case GET_YEARS_OF_BIRTH:
      return { ...state, yearsOfBirth: action.payload };
    case GET_TEAMS_DRIVER:
        return { ...state, teamsdriver: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
