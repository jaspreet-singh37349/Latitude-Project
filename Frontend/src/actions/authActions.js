import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {setData} from './dataAction';

import { GET_ERRORS, SET_CURRENT_USER } from './ActionTypes';


export const loginUser = (userData,successs,fail) => dispatch => {
  axios
    .post('http://127.0.0.1:5000/user/login', userData)
    .then(res => {
      
      successs(res.data)
      const { token } = res.data;
    
      localStorage.setItem('jwtToken', token);
   
      setAuthToken(token);
    
      const decoded = jwt_decode(token);
    
     dispatch(setData(res.data.images));

      setTimeout(()=>{
        dispatch(setCurrentUser(decoded));
      },500)
    })
    .catch(err =>
    {
        fail(err.response.data)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
    );
};


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');

  setAuthToken(false);

  dispatch(setCurrentUser({}));
  
};
