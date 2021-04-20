import {Box} from '@material-ui/core';
import {makeStyles, Tooltip, IconButton} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import {withRouter} from 'react-router';
import CircularProgressWithLabel from '../movie/CircularProgressWithLabel';

import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  movieCardRoot: {
    width: "225px",
    height: "350px",
    position: 'relative',
    margin: '0px 5px'
  },
  movieDescription: {
    display: "flex",
    marginTop: "10px",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieProps: {
    fontFamily: "Montserrat, sans-serif"
  },
  movieTitle: {
    fontSize: ".8em",
    color: "rgb(230,191,27)",
    textAlign: "center"
  },
  movieSubtitle: {
    fontSize: ".6em",
    color: "lightgray",
    marginTop: '5px'
  },
  deleteIconToolTip: {
      position: 'absolute',
      top: '0',
      right: '0'
  }
}));


const MovieDeleteCard = function(props){
    const {movieId, movieName, movieImage, movieReleaseDate, movieRatingAverage} = props.movie;
    const {onClickDeleteMovieFromList} = props;

    const classes = useStyles();

    const onClickGoToMovieDetail = function() {
        const { movieName, movieId } = props.movie;
        props.history.push({
          pathname: `/movie/${movieName}-${movieId}`,
          state: {
            movieId: movieId
          }
        });

      };


    return (
      <Box
        onClick={e => onClickGoToMovieDetail(movieName, movieId)}
        className={classes.movieCardRoot}
      >
        <img src={movieImage} width="225px" height="275px" />
        <Box className={classes.movieDescription}>
          <span className={clsx(classes.movieProps, classes.movieTitle)}>
            {movieName}
          </span>
          <span className={clsx(classes.movieProps, classes.movieSubtitle)}>
            {movieReleaseDate}
          </span>
        </Box>
        <CircularProgressWithLabel rating={movieRatingAverage} />
        <Tooltip onClick={((e) => onClickDeleteMovieFromList(e, movieId))} className={classes.deleteIconToolTip} title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
}

const MovieDeleteCardWithRouter = withRouter(MovieDeleteCard);
export default MovieDeleteCardWithRouter;