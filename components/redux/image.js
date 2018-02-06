import axios from 'axios';
import IP from '../../IP';


/* -----------------    ACTION TYPES    ------------------ */

const ADD     = 'ADD_PICTURE';


/* ------------     ACTION CREATORS      ------------------ */

const addImage  = picture => ({ type: ADD, picture });


/* ------------          REDUCER         ------------------ */

export default function reducer (pictures = [], action) {
  switch (action.type) {

    case ADD:
      return [action.picture, ...pictures];

    default:
      return pictures;
  }
}

/* ------------       THUNK CREATORS     ------------------ */


export const addPictures = image => dispatch => {
  axios.post(`${IP}/api/picture`, image)
       .then(res => dispatch(addImage(res.data)))
       .catch(err => console.error(`Creating trail: ${trail.id} unsuccesful`, err));
};

