import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import MovieAddToolTip from './MovieAddToolTip';

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
  }
}));


const MovieCard = function(props){
    const {movieId, movieName, movieImage, movieReleaseDate, movieRatingAverage} = props.movie;
    const {
      onClickOpenAddMovieToMovieListModal,
      onClickCloseAddMovieToMovieListModal,
      onHoverDisplayToolTip,
      displayToolTip,
      onClickAddMovieToMovieList
    } = props;

    const classes = useStyles();

    const onClickGoToMovieDetail = function() {
        let { movieName, movieId } = props.movie;
        const updatedMovieName = movieName.replace("%", "");
        props.history.push({
          pathname: `/movie/${updatedMovieName}-${movieId}`,
          state: {
            movieId: movieId
          }
        });

      };

    const updatedMovieImage = movieImage.includes("t/p/original") ? movieImage : `https://www.themoviedb.org/t/p/original/${movieImage}`


    return (
      <Box
        onMouseEnter={() => onHoverDisplayToolTip(movieId)}
        onClick={e => onClickGoToMovieDetail(movieName, movieId)}
        className={classes.movieCardRoot}
      >
        <img src={updatedMovieImage} width="225px" height="275px" />
        <Box className={classes.movieDescription}>
          <span className={clsx(classes.movieProps, classes.movieTitle)}>
            {movieName}
          </span>
          <span className={clsx(classes.movieProps, classes.movieSubtitle)}>
            {movieReleaseDate}
          </span>
        </Box>
        <CircularProgressWithLabel rating={movieRatingAverage} />
        <MovieAddToolTip
          movieId={movieId}
          onClickOpenAddMovieToMovieListModal={
            onClickOpenAddMovieToMovieListModal
          }
          onClickCloseAddMovieToMovieListModal={
            onClickCloseAddMovieToMovieListModal
          }
          displayToolTip={displayToolTip}
        />
      </Box>
    );
}

const MovieCardWithRouter = withRouter(MovieCard);
export default MovieCardWithRouter;