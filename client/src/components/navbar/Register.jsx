import { useState } from "react";
import React from "react";
import { register } from "../../redux/auth/actions";
import { useDispatch } from "react-redux";
import './navbar.css'
const Register = ({handleRegisterClose}) => {
  const dispach = useDispatch();
  const [registerData, setRegisterData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispach(register(registerData));
      setRegisterData({
        fname: "",
        lname: "",
        email: "",
        password: "",
      });
      handleRegisterClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (

      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={registerData.fname}
          placeholder="First Name"
          onChange={(e) =>
            setRegisterData({ ...registerData, fname: e.target.value })
          }
        />
        <input
          type="text"
          value={registerData.lname}
          placeholder="Last Name"
          onChange={(e) =>
            setRegisterData({ ...registerData, lname: e.target.value })
          }
        />
        <input
          type="email"
          value={registerData.email}
          placeholder="Email"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />
        <input
          type="password"
          value={registerData.password}
          placeholder="Password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
        <input type="submit" value="Register" />
      </form>
   
  );
};

export default Register;
