import {Paper, Box, Fade} from '@material-ui/core';
import { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import sendFormData from '../../api/api-wrappers';
import {loginRoute} from '../../api/api-routes';
import {withRouter} from 'react-router';
import LoginDetail from './LoginDetail';
import LoginForm from './LoginForm';
import LoadingSpinner from '../spinner/LoadingSpinner';



const useStyles = makeStyles(() => ({
  loginRoot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131b21",
  },
  loginPaper: {
    width: "900px",
    height: "600px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 10px black",
    zIndex: "20",
    position: "relative"
  },
  longFilmImg: {
    height: "700px",
    width: "1400px",
    position: "absolute",
  },
  popcornEmoticonImg: {
    width: "110px",
    height: "110px",
    position: "absolute",
    left: "-4%",
    top: "-14%",
    zIndex: "99"
  },
  logoTitle: {
    fontFamily: "Montserrat, sans-serif",
    position: "absolute",
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: "50px",
    left: "0",
    top: "0",
    margin: "0",
    padding: "20px 0 0 20px",
    letterSpacing: "0.05em",
    height: "fit-content",
    width: "fit-content",
    color: "rgb(230,191,27)"
  }
}));

const Login = function(props){
    const [state, setState] = useState({userEmail: '', userPassword: '', success: false, responseError: false, responseErrorMessage: '', loading: false, errors: {userEmailError: '', userPasswordError: ''}});
    const classes = useStyles();


    const validateInput = function(){
      const {userEmail, userPassword} = state;

      let emailError = '';
      let passwordError = '';

    

      if(userEmail.trim().length === 0)
        emailError = "Cannot be empty";
      else if(userEmail.trim().length > 25)
        emailError = "Cannot be greater than 40 characters";
      
      if(userPassword.trim().length === 0)
        passwordError = "Cannot be empty";
      else if(userPassword.trim().length > 15 || userPassword.trim().length < 5)
        passwordError = "Must be between 5 and 15 characters.";

        
      return { emailError, passwordError };
    }
    

    const onSubmit = async (e) => {
        e.preventDefault();

        const errors = validateInput();

        if (errors.emailError.length !== 0 || errors.passwordError.length !== 0) {
          setState(prevState => ({
            ...prevState,
            errors: {
              userEmailError: errors.emailError,
              userPasswordError: errors.passwordError
            }
          }));
        } else {
          const login = {
            userEmail: state.userEmail,
            userPassword: state.userPassword
          };
          const result = await sendFormData(login, loginRoute);

          if (result.status !== 200) {
            setState({ ...state, responseError: true });
          } else {
            setState({
              userEmail: "",
              userPassword: "",
              success: true,
              responseError: false,
              errors: { userEmailError: "", userPasswordError: "" }
            });
            sessionStorage.setItem("userId", result.userId);
            setTimeout(() => {
              props.history.push({
                pathname: "/dashboard",
                state: {
                  userId: result.userId
                }
              });
            }, 1500);
          }
        }
    }

    const onChange = (e) => {
        const {name, value} = e.target;

        setState({...state, [name]: value});
    }

    const onClickGoToRegister = function(){
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))

      setTimeout(() => {
        props.history.push({
        pathname: '/register'
        })
      }, 700);
    }

    const {success, loading, errors, responseError} = state;

    if(success || loading)
      return <LoadingSpinner />



    return (
      <Fade
        mountOnEnter
        unmountOnExit
        in={true}
        timeout={{ enter: 2000, exit: 1500 }}
      >
        <Box className={classes.loginRoot}>
          <h1 className={classes.logoTitle}>MovieU</h1>
          <img src="/images/long-film.png" className={classes.longFilmImg} />
          <Paper className={classes.loginPaper}>
            <img
              src="/images/popcorn-emoticon.png"
              className={classes.popcornEmoticonImg}
            />
            <LoginDetail />
            <LoginForm
              responseError={responseError}
              errors={errors}
              onClickGoToRegister={onClickGoToRegister}
              onSubmit={onSubmit}
              onChange={onChange}
            />
          </Paper>
        </Box>
      </Fade>
    );
}



const LoginWithRouter = withRouter(Login);

export default LoginWithRouter;