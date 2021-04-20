import {TextField, Box, Button, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    registerFormRoot: {
        width: '600px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 10px black'
    },
    registerForm: {
        display: 'flex',
        width: '70%',
        margin: '0 auto',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    registerFormTitle: {
        fontFamily: "Montserrat, sans-serif",
    },
    registerFormInput: {
        width: '100%',
        fontFamily: "Montserrat, sans-serif",
        marginTop: '20px',
        '&:first-child': {
            marginTop: '0'
        }
    },
    registerFormButton: {
        marginTop: "40px",
        width: '100%',
        height: "40px",
        fontWeight: "500",
        letterSpacing: ".14em",
        fontFamily: "Montserrat, sans-serif",
        background: "rgb(230,191,27)",
        background:
            "linear-gradient(90deg, rgba(230,191,27,1) 100%, rgba(212,209,207,1) 100%, rgba(238,238,238,1) 100%)"
    },
    registerFormSubRouteContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%'
    },
    registerFormSubRouteRow: {
        display: "flex",
        flexDirection: "column"
    },
    registerFormSubrouteTitle: {
        marginTop: "5px",
        color: "lightgray",
        fontSize: ".8em",
        fontWeight: "bold"
    },
    registerFormSubrouteLink: {
        marginTop: "5px",
        width: "fit-content"
    },
    registerFormSubrouteSpan: {
        fontSize: ".8em",
        fontWeight: "bold",
        color: "#0000EE",
        "&:hover": {
            color: "lightgray"
        }
    }
}));

const RegisterForm = function(props){

    const {onSubmit, onChange, errors, responseError, onClickGoToLogin} = props;
    const classes = useStyles();


    return (
      <Paper className={classes.registerFormRoot}>
        <h1 className={classes.registerFormTitle}>Create Your Account</h1>
        {responseError && <Alert severity="error">{responseError}</Alert>}
        <form className={classes.registerForm} onSubmit={onSubmit}>
          <TextField
            className={classes.registerFormInput}
            required
            label="First Name"
            onChange={onChange}
            error={errors.userFirstName.length > 0}
            helperText={errors.userFirstName}
            type="text"
            name="userFirstName"
          />
          <TextField
            className={classes.registerFormInput}
            required
            label="Last Name"
            onChange={onChange}
            error={errors.userLastName.length > 0}
            helperText={errors.userLastName}
            type="text"
            name="userLastName"
          />
          <TextField
            className={classes.registerFormInput}
            required
            label="Email"
            onChange={onChange}
            error={errors.userEmail.length > 0}
            helperText={errors.userEmail}
            type="email"
            name="userEmail"
          />
          <TextField
            className={classes.registerFormInput}
            required
            label="Password"
            onChange={onChange}
            error={errors.userPassword.length > 0}
            helperText={errors.userPassword}
            type="password"
            name="userPassword"
          />

          <Box className={classes.registerFormSubRouteContainer}>
            <Box className={classes.registerFormSubRouteRow}>
              <span className={classes.registerFormSubrouteTitle}>
                Already have an account?
              </span>
              <Link
                className={classes.registerFormSubrouteLink}
                onClick={onClickGoToLogin}
              >
                <span className={classes.registerFormSubrouteSpan}>Login</span>
              </Link>
            </Box>

            <Box className={classes.registerFormSubRouteRow}>
              <span className={classes.registerFormSubrouteTitle}>
                Forgot your password?
              </span>
              <Link className={classes.registerFormSubrouteLink} to="/register">
                <span className={classes.registerFormSubrouteSpan}>
                  Reset Password
                </span>
              </Link>
            </Box>
          </Box>

          <Button
            variant="contained"
            className={classes.registerFormButton}
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </Paper>
    );
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

export default RegisterForm;