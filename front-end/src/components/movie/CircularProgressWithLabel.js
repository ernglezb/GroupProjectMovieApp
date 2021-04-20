import {Box, Typography} from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  circularProgressRoot: {
    position: "absolute",
    left: "1%",
    top: "65%",
    color: "rgb(230,191,27)"
  },
  circularProgressText: {
    color: "white",
    fontWeight: "700",
    fontFamily: "Montserrat, sans-serif"
  },
  colorPrimary: {
    color: "rgb(230,191,27)"
  }
}));

const CircularProgressWithLabel = function(props){

    const {rating} = props;
    const classes = useStyles();

    return (
      <Box className={classes.circularProgressRoot} display="inline-flex">
        <CircularProgress className={classes.colorPrimary} variant="determinate" value={rating * 10} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            className={classes.circularProgressText}
            variant="caption"
            component="div"
          >{`${rating * 10}%`}</Typography>
        </Box>
      </Box>
    );

}

export default CircularProgressWithLabel;