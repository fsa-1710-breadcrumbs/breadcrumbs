'use strict';
//ACTION TYPES

const SAVE_LOCATION = 'SAVE_LOCATION';
const FETCH_LOCATION = 'FETCH_LOCATION';

export const saveLocation = location => ({type: LOCATION_CHANGED, location})
export const fetchLocation = () => ({ type: FETCH_LOCATION, location})

//THUNK
export const crumbOrigin = ( locationInformation ) =>  function thunk(dispatch) {
    return axios.post('/api/trails', locationInformation)
    .then(res => res.data)
    .then(newCrumb => dispatch(saveLocation(newCrumb)))
  }

//REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case SAVE_LOCATION:
    return [...action.location];
    case FETCH_LOCATION:
    return action.location
  default:
  return state
  }
}
