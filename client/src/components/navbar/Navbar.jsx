import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { blue } from "@mui/material/colors";
import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import Avatar from "@mui/material/Avatar";
import "./navbar.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Navbar = () => {
  const user = useSelector((state) => {
    return state.authReducer;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn || false);
  const [mopen, setmOpen] = React.useState(false);
  const [erropen, setErrOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [userToken, setUserToken] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (user.error && !user.isLoggedIn) {
      console.log(user.error);
      setErrorMessage(user.error);
      
      setErrOpen(true);
    } else if (user.isLoggedIn) {
      setUsername(user.user.fname);
      setIsLoggedIn(true);
      setmOpen(true);
      setUserToken(user.token);
      console.log("Navbar.js: user logged in", user);
    } else {
      setUsername("");
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };
  const handleRegisterOpen = () => {
    setOpen(false);
    setRegisterOpen(true);
  };
  const handleLoginOpen = () => {
    setOpen(true);
    setRegisterOpen(false);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrOpen(false);
    setmOpen(false);
  };
  const handleLoginError = (error) => {
    setErrorMessage(error);
    setErrOpen(true);
  };
  localStorage.setItem('token',userToken);
  localStorage.setItem('tokenExpiration', new Date().getTime() + 24 * 60 * 60 * 1000);
  function checkTokenExpiration() {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration && new Date().getTime() > tokenExpiration) {
      setIsLoggedIn(false);
      setUsername("");
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      
    }
  }
  setInterval(checkTokenExpiration, 1000);
  return (
    <header className="header">
      <nav className="NavBar">
        <div>
          <div alt="logo" className="NavLogo" />
        </div>
        <div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search " }}
            />
          </Search>
        </div>
        <div className="NavButtons">
          {isMobile ? (
            <>
              <Button onClick={handleMenuOpen}>
                <i class="bx bx-menu nav__icon"></i>
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {!isLoggedIn ? (
                  <MenuItem onClick={handleClickOpen}>
                    <i class="bx bx-user nav__icon"></i>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: blue[500] }}>
                      {username.charAt(0).toUpperCase()}
                    </Avatar>
                  </MenuItem>
                )}
                <MenuItem>
                  <i class="bx bx-cart nav__icon"></i>
                </MenuItem>
                <MenuItem>
                  <i class="bx bx-heart nav__icon"></i>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {!isLoggedIn ? (
                <Button disabled={isLoggedIn} onClick={handleClickOpen}>
                  <i className="bx bx-user nav__icon"></i>
                </Button>
              ) : (
                <Button>{username}</Button>
              )}
              <Button>
                <i class="bx bx-cart nav__icon"></i>
              </Button>
              <Button>
                <i class="bx bx-heart nav__icon"></i>
              </Button>
            </>
          )}
        </div>
      </nav>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullScreen={isMobile}
        sx={{
          "& .MuiDialogTitle-root": {
            backgroundColor: "#222",
            color: "#fff",
          },
          "& .MuiDialogContent-root": {
            backgroundColor: "#222",
            color: "#000",
          },
          "& .MuiDialogActions-root": {
            backgroundColor: "#222",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <Login
            handleClose={handleClose}
            setmOpen={setmOpen}
            setErrOpen={setErrOpen}
            isLoggedIn={isLoggedIn}
            handleLoginError={handleLoginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterOpen}> Register Here</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={registerOpen}
        onClose={handleRegisterClose}
        aria-labelledby="responsive-dialog-title"
        fullScreen={isMobile}
        sx={{
          "& .MuiDialogTitle-root": {
            backgroundColor: "#222",
            color: "#fff",
          },
          "& .MuiDialogContent-root": {
            backgroundColor: "#222",
            color: "#000",
          },
          "& .MuiDialogActions-root": {
            backgroundColor: "#222",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <Register handleRegisterClose={handleRegisterClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginOpen}> Login Here</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={mopen} autoHideDuration={1000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`login succesful!`}
        </Alert>
      </Snackbar>
      <Snackbar
        open={erropen}
        autoHideDuration={1000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </header>
  );
};

export default Navbar;
