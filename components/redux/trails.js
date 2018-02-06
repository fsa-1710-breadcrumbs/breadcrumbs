import axios from 'axios';
import IP from '../../IP';


/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE = 'INITIALIZE_TRAILS';
const CREATE     = 'CREATE_TRAIL';
const REMOVE = 'REMOVE_TRAIL';
const UPDATE     = 'UPDATE_TRAIL';

/* ------------     ACTION CREATORS      ------------------ */

const init  = trails => ({ type: INITIALIZE, trails });
const create = trail  => ({ type: CREATE, trail });
const remove = id    => ({ type: REMOVE, id });
const update = trail  => ({ type: UPDATE, trail });

/* ------------          REDUCER         ------------------ */

export default function reducer (trails = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.trails;

    case CREATE:
      return [action.trail, ...trails];

    case REMOVE:
      return trails.filter(trail => trail.id !== action.id);

    case UPDATE:
      return trails.map(trail => (
        action.trail.id === trail.id ? action.trail : trail
      ));

    default:
      return trails;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchTrails = () => dispatch => {
  axios.get(`${IP}/api/trails`)
       .then(res => dispatch(init(res.data)));
};

export const removeTrail = id => dispatch => {
  axios.delete(`${IP}/api/trails/${id}`)
       .then(() => dispatch(remove(id)))
       .catch(err => console.error(`Removing trail: ${id} unsuccesful`, err));
};

export const addTrail = trail => dispatch => {
  axios.post(`${IP}/api/trails`, trail)
        .then(()=>console.log(trail))
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating trail: ${trail.id} unsuccesful`, err));
};

export const updateTrail = (id, trail) => dispatch => {
  axios.put(`${IP}/api/trails/${id}`, trail)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating trail: ${trail.id} unsuccesful`, err));
};
