import {Box, TextField, Button, Fade} from '@material-ui/core';
import {Link} from  'react-router-dom';
import PropTypes from "prop-types";
import {makeStyles} from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => ({
  loginFormRoot: {
    flex: "3",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    width: "100%",
    height: "100%"
  },
  loginTitle: {
    fontSize: "1.2em",
    letterSpacing: ".14em",
    fontFamily: "Montserrat, sans-serif"
  },
  loginForm: {
    marginTop: "30px",
    display: "flex",
    width: "100%",
    flexDirection: "column"
  },
  loginFormInput: {
    width: "100%",
    fontFamily: "Montserrat, sans-serif",

    "&:last-child": {
      marginTop: "30px"
    }
  },
  loginFormButton: {
    marginTop: "40px",
    height: "40px",
    fontWeight: "500",
    letterSpacing: ".14em",
    fontFamily: "Montserrat, sans-serif",
    background: "rgb(230,191,27)",
    background:
      "linear-gradient(90deg, rgba(230,191,27,1) 100%, rgba(212,209,207,1) 100%, rgba(238,238,238,1) 100%)"
  },
  loginFormSubRouteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loginFormSubRouteRow: {
    display: "flex",
    flexDirection: "column"
  },
  loginFormSubrouteTitle: {
    marginTop: "5px",
    color: "lightgray",
    fontSize: ".8em",
    fontWeight: "bold"
  },
  loginFormSubrouteLink: {
    marginTop: "5px",
    width: "fit-content"
  },
  loginFormSubrouteSpan: {
    fontSize: ".8em",
    fontWeight: "bold",
    color: "#0000EE",
    "&:hover": {
      color: "lightgray"
    }
  },
  alertMessage: {

  }
}));


const LoginForm = function(props){

    const { onSubmit, onChange, onClickGoToRegister, errors, responseError} = props;
    const classes = useStyles();

    return (
      <Box className={classes.loginFormRoot}>
        <h3 className={classes.loginTitle}>Login</h3>
        {responseError && <Alert severity="error" >Invalid login credentials</Alert>}
        <form onSubmit={onSubmit} className={classes.loginForm}>
          <TextField
            onChange={onChange}
            InputProps={{
              className: classes.loginFormInput
            }}
            error={errors.userEmailError.length > 0}
            helperText={errors.userEmailError}
            label="Email"
            name="userEmail"
            type="email"
          />

          <TextField
            InputProps={{
              className: classes.loginFormInput
            }}
            error={errors.userPasswordError.length > 0}
            helperText={errors.userPasswordError}
            onChange={onChange}
            autoComplete="current-password"
            label="Password"
            name="userPassword"
            placeholder="Password"
            type="password"
          />

          <Box className={classes.loginFormSubRouteContainer}>
            <Box className={classes.loginFormSubRouteRow}>
              <span className={classes.loginFormSubrouteTitle}>
                Don't have an account?
              </span>
              <Link
                className={classes.loginFormSubrouteLink}
                onClick={onClickGoToRegister}
              >
                <span className={classes.loginFormSubrouteSpan}>Register</span>
              </Link>
            </Box>

            <Box className={classes.loginFormSubRouteRow}>
              <span className={classes.loginFormSubrouteTitle}>
                Forgot your password?
              </span>
              <Link
                className={classes.loginFormSubrouteLink}
                onClick={onClickGoToRegister}
              >
                <span className={classes.loginFormSubrouteSpan}>
                  Reset Password
                </span>
              </Link>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="outlined"
            className={classes.loginFormButton}
          >
            Login
          </Button>
        </form>
      </Box>
    );
}

LoginForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default LoginForm;