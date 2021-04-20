import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  loginDetailRoot: {
    flex: "4",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative"
  },
  darkBanner: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundImage: "url(/images/login-banner.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  loginDetailContent: {
    zIndex: "1",
    display: "flex",
    justifyContent: "center"
  }
}));


const LoginDetail = function(){

    const classes = useStyles();

    return (
        <Box className={classes.loginDetailRoot} >
            <Box className={classes.darkBanner} ></Box>
            <Box className={classes.loginDetailContent} >
            </Box>
        </Box>
    )
}

export default LoginDetail;