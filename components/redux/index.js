import { combineReducers } from 'redux';
import users from './users';
import currentUser from './auth';

export default combineReducers({
  users: users,
  currentUser: currentUser
});
