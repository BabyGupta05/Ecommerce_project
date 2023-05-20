import * as React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/actions";
import { useNavigate } from "react-router-dom";
import './navbar.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = ({handleClose}) => {
  
  const navigate=useNavigate();
  const dispach = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispach(login(loginData));
      setLoginData({
        email: "",
        password: "",
      });
      navigate('/login');
       setOpen(true);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
// alert
const [open, setOpen] = React.useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleAlertClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
  return (
 <form action="" onSubmit={handleSubmit} className="form">
        <input
          type="email"
          value={loginData.email}
          placeholder="email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      </form>
 
  
  );
};

export default Login;
