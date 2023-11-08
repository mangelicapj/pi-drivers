import { GET_DRIVERS } from "./actions";
const inicialState ={
    drivers:[],
};



const rootReducer =(state =inicialState, action)=>{
    switch(action.type){
        case GET_DRIVERS:
            return {...state, drivers: action.payload};
        default:
            return {...state};
    }
}

export default rootReducer;