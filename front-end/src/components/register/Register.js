import {Box} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {makeStyles, Fade} from '@material-ui/core';
import PropTypes from "prop-types";
import validate from './register-validate';
import sendFormData from '../../api/api-wrappers';
import RegisterForm from'./RegisterForm';
import {registerRoute} from '../../api/api-routes.js'; 
import LoadingSpinner from '../spinner/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  registerRoot: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#131b21"
  },
  title: {
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

const Register = function(props){
    const [state, setState] = useState({userFirstName: '', userLastName: '', userEmail: '', userPassword: '', success: false, error: '', loading: false});
    const [errors, setErrors] = useState({ userFirstName: '', userLastName: '', userEmail: '', userPassword: '' });
    const classes = useStyles();


    useEffect(() => {

    }, [state.success]);

    const onSubmit = async function(e){
        e.preventDefault();

        const errorsObj = validate(state);
        let containsError = false;

        Object.entries(errorsObj).map((entry) => {
            let key = entry[0];
            let value = entry[1];

            if(value.length > 0){
                containsError = true;
                setErrors({...errors, [key]: value});
            }
        });

        if(!containsError){
            const result = await sendFormData(state, registerRoute);
            if(result.status !== 201){
              console.log(result);
                setState({...state, error: result.message});
            } else {
                setState({...state, success: true});
                setTimeout(() => {
                    props.history.push('/login')
                }, 1500);
            }
            
        }
    }

    const onChange = function(e){
        const {name, value} = e.target;
        
        setState({...state, [name]: value});
    }

    const onClickGoToLogin = function(){
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))

      setTimeout(() => {
        props.history.push({
        pathname: '/login'
        })
      }, 700);
    }


    const {success, loading} = state;

    if(success || loading)
        return <LoadingSpinner />

    return (
      <Fade
        mountOnEnter
        unmountOnExit
        in={true}
        timeout={{ enter: 2000, exit: 1500 }}
      >
        <Box className={classes.registerRoot}>
          <h1 className={classes.title}>MovieU</h1>
          <RegisterForm
            onClickGoToLogin={onClickGoToLogin}
            responseError={state.error}
            errors={errors}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </Box>
      </Fade>
    );
}

Register.propTypes = {
    history: PropTypes.object.isRequired
}

const RegisterWithRouter = withRouter(Register);
export default RegisterWithRouter;