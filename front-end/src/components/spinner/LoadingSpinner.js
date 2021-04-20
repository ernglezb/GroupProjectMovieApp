import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  loadingSpinnerBackground: {
    backgroundColor: "#131b21",
    width: '100%',
    height: '100%',
    zIndex: '100'
  },
  root: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    top: "35%",
    textAlign: "center"
  },
  colorPrimary: {
    color: "rgb(230,191,27)"
  }
}));

const LoadingSpinner = function(){

    const classes = useStyles();

    return (
      <div className={classes.loadingSpinnerBackground} >
        <CircularProgress
          size={175}
          className={clsx(classes.root, classes.colorPrimary)}
          color="secondary"
        />
      </div>
    );
}


export default LoadingSpinner;