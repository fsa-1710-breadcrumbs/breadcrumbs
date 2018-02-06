import { combineReducers } from 'redux';
import users from './users';
import currentUser from './auth';
import trails from './trails';
import image from './image';

export default combineReducers({
  users: users,
  currentUser: currentUser,
  trails: trails,
  image: image
});
