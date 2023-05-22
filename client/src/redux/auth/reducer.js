import { LOGIN,REGISTER,LOGOUT,LOGIN_FAIL} from "./actionTypes";

  
  const initialState = {
    isLoggedIn: false,
    user: null,
    error: null
  };
  

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload, 
          error: null
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null, 
          error: action.error
        };
      case REGISTER:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;