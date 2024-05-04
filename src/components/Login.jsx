import "./Login.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";

import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginUser(auth, email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed in
        const user = userCredential.user;
        // Handle successful login (e.g., redirect to a different page)
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Please enter correct email / password")
      });
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(!loading);
    setTimeout(() => setLoading(false), 3000);
    if (!email || !password) return; 
    loginUser(auth, email, password);
  }

  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        height: "97vh",
        flexDirection: "column",
      }}
    >
      <img
        src="/src/assets/3d-modeling128.png"
        alt="logo"
        style={{ marginTop: "4em", height: "96px", width: "96px" }}
      />
      <span
        style={{
          fontFamily: "Candara",
          fontSize: "1.5em",
          fontWeight: "bolder",
        }}
      >
        IWDS <br />
      </span>
      <span
        style={{
          fontFamily: "Candara",
          fontSize: "1.125em",
        }}
      >
        Integrated Wireless Detection System
      </span>
      <br />
      <React.Fragment>
        <CssBaseline />
        <Box>
          <Card
            className="cardlogin"
            sx={{
              maxWidth: "350px",
              maxHeight: "60vh",
              margin: "1em",
              border: "3px solid rgba( 0, 0, 0, 0.68 )",
              borderRadius: "5px",
              background: "rgba( 255, 255, 255, 0.9 )",
              boxShadow: "0 3px 3px 0 rgba( 31, 38, 135, 0.2 )",
              backdropFilter: "blur ( 4px )",
              WebkitBackdropFilter: "blur ( 4px )",
            }}
            variant="outlined"
          >
            <React.Fragment>
              <CardContent
                sx={{
                  borderColor: "darkblue",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    textAlign: "center",
                  }}
                >
                  {/* Log In */}
                </Typography>
                {/* <hr width="80%" /> */}
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <br />
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AccountCircle
                      sx={{ color: "action.active", mr: 1, my: 1.75 }}
                    />
                    <TextField
                      id="input-with-sx"
                      label="Email ID"
                      variant="filled"
                      sx={{ width: "77%" }}
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <VpnKeyIcon
                      sx={{ color: "action.active", mr: 0, my: 2.75 }}
                    />
                    <FormControl sx={{ m: 1, width: "77%" }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end" >
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        onChange={(e)=> setPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <br />
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LoadingButton
                        size="large"
                        onClick={handleClick}
                        endIcon={<ChevronRightTwoToneIcon />}
                        loading={loading}
                        loadingPosition="end"
                        // loadingIndicator="Loading…"
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          borderWidth: "1.5px",
                          fontWeight: "bolder",
                        }}
                      >
                        <span>Login</span>
                      </LoadingButton>
                    </Box>

                    <Box sx={{ "& > button": { m: 1 } }}></Box>
                  </div>
                </Box>
                <br />
              </CardContent>
            </React.Fragment>
          </Card>
        </Box>
      </React.Fragment>
    </div>
  );
}

export default Login;
