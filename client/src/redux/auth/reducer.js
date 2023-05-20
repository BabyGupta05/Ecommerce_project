import { LOGIN,REGISTER,LOGOUT} from "./actionTypes";

  
  const initialState = {
    isLoggedIn: false,
    user: null,
  };
  

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user, 
        };
      case REGISTER:
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user
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