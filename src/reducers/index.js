import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import uiReducer from './ui';


const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  uiState: uiReducer
});

export default rootReducer;
