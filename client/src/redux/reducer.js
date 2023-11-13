import { GET_DRIVERS, GET_TEAMS, GET_DRIVER, POST_DRIVER, GET_DRIVER_NAME} from "./actions";

const initialState = {
  drivers: [],
  teams: [],
  driver:{},
  detail:{},
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
    default:
      return state; 
  }
};

export default rootReducer;
