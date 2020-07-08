import {ADD_DATA} from './ActionTypes';

export const setData = data => {
    return {
      type: ADD_DATA,
      payload: data
    };
  };