import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import SearchIcon from "@mui/icons-material/Search";
import Register from "./Register";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.authReducer.isRegistered;
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
    if (user) {
      setIsRegistered(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleForm = () => {
    if (user) {
      setIsRegistered(true);
    }
  };

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
                <MenuItem onClick={handleClickOpen}>
                  <i class="bx bx-user nav__icon"></i>
                </MenuItem>
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
              <Button onClick={handleClickOpen}>
                <i class="bx bx-user nav__icon"></i>
              </Button>
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
        <DialogTitle id="responsive-dialog-title">
          {isRegistered ? "LOGIN" : "REGISTER"}
        </DialogTitle>
        <DialogContent>
          {isRegistered ?(<> <Login /> </>) :(<> <Register /></>)}
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
