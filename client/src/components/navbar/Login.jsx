import * as React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const Login = ({ handleClose ,setmOpen,isLoggedIn,setErrOpen}) => {
  

  const navigate = useNavigate();
  const dispach = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispach(login(loginData));
      setLoginData({
        email: "",
        password: "",
      });
      navigate("/");
      
      handleClose()
      // if(isLoggedIn){
       
      //   console.log("login.jsx",isLoggedIn);
      //   setmOpen(true);
      // }else{
      //   setErrOpen(true);
      // }
     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit} className="form">
      <input
        type="email"
        value={loginData.email}
        placeholder="email"
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      <input
        type="password"
        value={loginData.password}
        placeholder="password"
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
