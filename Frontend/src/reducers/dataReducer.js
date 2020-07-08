import {ADD_DATA} from '../actions/ActionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DATA:
      return action.payload;
    default:
      return state;
  }
}