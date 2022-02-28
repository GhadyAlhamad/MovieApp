import React, { useState } from "react";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "../../constants/firebase";
import Notiflix from "notiflix";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import useStyle from "./style";

const Login = () => {
  // call use style
  const classes = useStyle();
  // call use history
  const navigate = useNavigate();

  // create state for credential
  const [credential, setCredential] = useState({
    Email: "",
    Password: "",
  });
  // create loading state
  const [loading, setLoading] = useState<boolean>(true);

  // on text field change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set credential data
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  // on credential submit
  const onSubmit = async (e: any) => {
    // prevent default
    e.preventDefault();

    try {
      // set loading false
      setLoading(false);
      // sin in with credential
      let userCredential = await auth.signInWithEmailAndPassword(
        credential.Email,
        credential.Password
      );
      // set loading for completed
      setLoading(true);
      // navigate to home
      navigate("/");
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
    return !credential.Email || !credential.Password;
  };

  return (
    <form className={classes.Container}>
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
            <Typography mt={6} className={classes.CardTitle}>
              <img
                src={window.location.origin + "/images/logo.png"}
                alt="logo"
                width="140"
              />
            </Typography>
            <Typography variant="body2" color="grey.600" component="div" mb={4}>
              Please log in or sign up for an account
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
                value={credential.Password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
              />
              <Box mt={2} sx={{ textAlign: "right" }}>
                <Link to="/forget-password">Forgot password!</Link>
              </Box>
            </Box>
            <Box mt={5} sx={{ px: 7 }}>
              {loading ? (
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.Button}
                  disabled={disabled()}
                  onClick={(e) => onSubmit(e)}
                >
                  Sign in
                </Button>
              ) : (
                <CircularProgress />
              )}
            </Box>
            <Box>
              <Typography mt={4} variant="body2" color="grey.600" component="p">
                If you don't have an account,{" "}
                <Link style={{ color: "#1D3557" }} to="/signup">
                  Sign Up
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
    </form>
  );
};

export default Login;
