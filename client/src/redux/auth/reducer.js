import { LOGIN,REGISTER,LOGOUT} from "./actionTypes";

  
  const initialState = {
    isLoggedIn: false,
    isRegistered: false,
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
          isRegistered: true,
          user: action.payload.user
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          isRegistered: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;