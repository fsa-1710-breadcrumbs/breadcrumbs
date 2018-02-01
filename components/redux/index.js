import { combineReducers } from 'redux';
import users from './users';
import currentUser from './auth';
import trails from './trails';

export default combineReducers({
  users: users,
  currentUser: currentUser,
  trails: trails
});
