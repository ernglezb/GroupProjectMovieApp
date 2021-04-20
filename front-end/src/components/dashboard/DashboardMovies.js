import {Box, Fade} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import MovieCard from '../movie/MovieCard';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  dashboardMoviesRoot: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    minHeight: "800px",
    marginTop: "75px",
    justifyContent: "space-evenly"
  },
  skeleton: {
    backgroundColor: "white",
    margin: "0px 5px 5px 5px",
    width: "225px",
    height: "350px"
  },
  dashboardMoviesHelperTitle: {
    fontFamily: "Montserrat, sans-serif",
  }
}));

const DashboardMovies = function(props){
    const [state, setState] = useState({movieId: -1});


    const {
      movies,
      onClickAddMovieToMovieList,
      onClickOpenAddMovieToMovieListModal,
      onClickCloseAddMovieToMovieListModal,
      loadingDashboard,
      movieType
    } = props;
    const classes = useStyles();

    const onHoverDisplayToolTip = function(id) {
      setState((prevState) => ({
        ...prevState,
        movieId: id
      }))
      props.movieToAddToList(id);
    };


    return (
        <Box className={classes.dashboardMoviesRoot}>
            {movieType === 'recommended' && movies.length === 0 && <h1 className={classes.dashboardMoviesHelperTitle} >Add movies to your movie list to get recommendations</h1>}
            {(loadingDashboard ? Array.from(new Array(20)) : movies).map((movie, i) => {
                return movie ? (
                    <MovieCard
                      key={movie.movieId}
                      onClickCloseAddMovieToMovieListModal={onClickCloseAddMovieToMovieListModal}
                      onClickOpenAddMovieToMovieListModal={onClickOpenAddMovieToMovieListModal}
                      onClickAddMovieToMovieList={onClickAddMovieToMovieList}
                      displayToolTip={movie.movieId === state.movieId ? true : false}
                      onHoverDisplayToolTip={onHoverDisplayToolTip}
                      movie={movie}
                    />
                ) : (
                  <Skeleton
                    key={i}
                    className={classes.skeleton}
                    variant="rect"
                  />
                );})
            }
        </Box>
    )
}

export default DashboardMovies;