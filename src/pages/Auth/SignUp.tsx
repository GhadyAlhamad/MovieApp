import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { auth } from "../../constants/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Notiflix from "notiflix";
import validateSignUp from "../../validation/validateSignUp";
import { createWatchlistMovie } from "../../constants/movieServices";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import useStyle from "./style";
import isEmpty from "../../validation/isEmpty";

const SignUp = () => {
  // call use style
  const classes = useStyle();
  // call use history
  const navigate = useNavigate();

  // create state for credential
  const [credential, setCredential] = useState({
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  // create loading state
  const [loading, setLoading] = useState<boolean>(true);

  // create state for validator
  const [validator, setValidator] = useState({
    errors: {
      Email: undefined,
      Password: undefined,
      ConfirmPassword: undefined,
    },
    isValid: undefined,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    // validate register data
    const registerValidator: any = validateSignUp(credential);
    // set validator
    setValidator(registerValidator);
    // if the data is valid
    setIsButtonDisabled(!registerValidator.isValid);
  }, [credential]);

  // on text field change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set credential data
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  // on credential submit to register new account
  const onSubmit = async (e: any) => {
    // prevent default
    e.preventDefault();

    try {
      // set loading false
      setLoading(false);

      /*
      // create user
      let userCredential = await auth.createUserWithEmailAndPassword(
        credential.Email,
        credential.Password
      );
      // create watch list for user
      await createWatchlistMovie(userCredential.user?.uid);
      // send success message
      Notiflix.Notify.success("User created successfully..", {
        timeout: 6000,
      });*/

      // send success message
      Notiflix.Notify.info(
        "You couldn't create new account for demo copy, login with: ghadyalhamad@gmail.com - 12345678..",
        { timeout: 20000 }
      );
      // set loading for completed
      setLoading(true);
      // go to home
      //navigate("/");
    } catch (ex: any) {
      // notify user with error message
      Notiflix.Notify.failure(ex.message, {
        timeout: 6000,
      });
      // set loading for completed
      setLoading(true);
    }
  };

  // is disabled
  const disabled = () => {
    return (
      !credential.Email || !credential.Password || !credential.ConfirmPassword
    );
  };

  return (
    <form>
      <div className={classes.Container}>
        <div className={classes.SubContainer}>
          <Card
            className={classes.Card}
            sx={{
              width: { xs: "100%", md: "418px" },
              height: { xs: "100%", md: "auto" },
              borderRadius: { xs: "0px", md: "20px" },
            }}
          >
            <CardContent className={classes.CardContent}>
              <Typography mt={3} className={classes.CardTitle}>
                <img
                  src={window.location.origin + "/images/logo.png"}
                  alt="logo"
                  width="120"
                />
              </Typography>
              <Typography
                variant="body2"
                color="grey.600"
                component="div"
                mb={4}
              >
                Please sign up new account
              </Typography>
              <Box sx={{ textAlign: "left" }} px={7}>
                <Typography
                  className={classes.Label}
                  color="#1D3557"
                  component="div"
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  className={classes.TextField}
                  type="email"
                  name="Email"
                  value={credential.Email}
                  error={!isEmpty(validator?.errors?.Email)}
                  helperText={validator?.errors?.Email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e)
                  }
                />
                <Typography
                  mt={2}
                  className={classes.Label}
                  color="#1D3557"
                  component="div"
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  className={classes.TextField}
                  type="password"
                  name="Password"
                  error={!isEmpty(validator?.errors?.Password)}
                  helperText={validator?.errors?.Password}
                  value={credential.Password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e)
                  }
                />
                <Typography
                  mt={2}
                  className={classes.Label}
                  color="#1D3557"
                  component="div"
                >
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  className={classes.TextField}
                  type="password"
                  name="ConfirmPassword"
                  error={!isEmpty(validator?.errors?.ConfirmPassword)}
                  helperText={validator?.errors?.ConfirmPassword}
                  value={credential.ConfirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e)
                  }
                />
              </Box>
              <Box mt={5} sx={{ px: 7 }}>
                {loading ? (
                  <Button
                    fullWidth
                    className={classes.Button}
                    disabled={disabled() || isButtonDisabled}
                    onClick={(e) => onSubmit(e)}
                  >
                    Sign up
                  </Button>
                ) : (
                  <CircularProgress />
                )}
              </Box>
              <Box>
                <Typography
                  mt={4}
                  variant="body2"
                  color="grey.600"
                  component="p"
                >
                  If you already have an account,{" "}
                  <Link style={{ color: "#1D3557" }} to="/login">
                    Login
                  </Link>
                </Typography>
                <Typography mt={4} variant="body2" color="grey.600">
                  <Link to="/terms">Terms and Conditions</Link>{" "}
                  <FiberManualRecordIcon
                    fontSize="small"
                    sx={{ width: "6px", height: "6px" }}
                  />{" "}
                  <Link to="/policy">Data Policy</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
