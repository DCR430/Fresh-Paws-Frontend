import { combineReducers } from "redux";
import user from './user';
import groomers from './groomers';

const rootReducer = combineReducers({
  user,
  groomers
});

export default rootReducer;