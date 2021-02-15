import {
  createStore,
  // combineReducers
} from "redux";
import user from "./reducers/userReducer";
// import commentReducer from './Reducers/commentReducer'

// const rootReducer = combineReducers({
//   user,
//   commentReducer,
// });

export default createStore(user);
