import axios from 'axios';
import { LOGIN, LOGOUT, REGISTER } from './actionTypes';

// Action creators
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', credentials)
    
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    try {
    
      const response =await axios.post('http://localhost:8080/user/register', userData);

      dispatch({
        type: REGISTER,
        payload: response.data,
      });
    } catch (error) {
      
      console.error('Registration failed:', error);
    }
  };
};
