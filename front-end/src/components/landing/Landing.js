import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {Box, Button, Fade} from '@material-ui/core';
import {withRouter} from 'react-router';
import { useState , useEffect} from 'react';
import clsx from 'clsx';
import Clapper from './Clapper';
import LoadingSpinner from '../spinner/LoadingSpinner';

const useStyles = makeStyles(() => ({
  landingPageBanner: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#131b21",
    backgroundImage: "url('/images/landing-background.png')",
    backgroundSize: 'cover',
  },
  landingPageBannerTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: "50px",
    margin: "0",
    padding: "20px 0 0 20px",
    letterSpacing: '0.05em',
    height: "fit-content",
    width: "fit-content",
    color: "rgb(230,191,27)"
  },
  landingPageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%"
  },
  landingPageDescription: {
    fontSize: "35px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "500",
    marginBottom: "100px",
    color: "white"
  },
  landingPageButtonWrapper: {
    width: "35%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  landingPageActionButton: {
    width: "200px",
    height: "45px",
    transition: "all .2s ease-out",
    color: "white",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "rgb(230,191,27)"
    }
  }
}));

const Landing = function(props){
    const [state, setState] = useState({
      isLoading: true,
      loadContent: false,
      displayModal: false,
      newPageLoading: false
    });

    const classes = useStyles();


    useEffect(() => {

        let timer = () => setTimeout(() => {
            setState({...state, isLoading: false, loadContent: true});
        }, 4000);

        let timerId = timer();

        return () => {
            clearTimeout(timerId);
        }
    }, []);

    const onClickGoToLogin = function(){
       setTimeout(() => {
         props.history.push({
           pathname: "/login"
         });
       }, 1500); 
      setNewPageLoading();
    }

    const onClickGoToRegister = function(){
      setTimeout(() => {
        props.history.push({
          pathname: "/register"
        });
      }, 1500); 
      setNewPageLoading();
    }

    const setNewPageLoading = function(){
      setState(prevState => ({
        ...prevState,
        newPageLoading: true
      }));    
    }


    const { isLoading, loadContent, newPageLoading } = state;

    if(isLoading)
        return <Clapper isLoading={isLoading} />

    if(newPageLoading)
      return <LoadingSpinner />


    return (
      <Fade mountOnEnter timeout={{ enter: 2000, exit: 3000 }} in={loadContent}>
        <Box className={clsx(classes.landingPageBanner)}>
          <h1 className={classes.landingPageBannerTitle}>MovieU</h1>

          <Box className={classes.landingPageContent}>
            <h1 className={classes.landingPageDescription}>
              All the best movies in one place.
            </h1>
            <Box className={classes.landingPageButtonWrapper}>
              <Button
                onClick={onClickGoToLogin}
                className={classes.landingPageActionButton}
                variant="outlined"
              >
                Login
              </Button>
              <Button
                onClick={onClickGoToRegister}
                className={classes.landingPageActionButton}
                variant="outlined"
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    );
}

const LandingWithRouter = withRouter(Landing);
export default LandingWithRouter;