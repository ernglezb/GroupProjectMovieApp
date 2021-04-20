import { useState, useEffect } from "react";
import { Box, Slide, Modal, Backdrop, makeStyles } from "@material-ui/core";
import { getMoviesFromMovieList,deleteMovieFromMovieList  } from "../movielist/movie-list-routes";
import MovieDeleteCard from './MovieDeleteCard';

const useStyles = makeStyles(() => ({
  movieListModal: {
    overflow: 'scroll'
  },
  movieListModalContainer: {
    backgroundColor: "white",
    top: "10%",
    left: "0",
    right: "0",
    position: "absolute",
    margin: "0 auto",
    width: "80%",
    minHeight: "700px",
    backgroundColor: "#131b21"
  },
  editMovieListError: {
    textAlign: "center",
    color: "red"
  },
  movieListModalMoviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: '90%',
    margin: '0 auto',
  },
  yourMovieTitle: {
    color: "rgb(230,191,27)",
    textAlign: 'center',
    fontSize: '2em'
  }
}));


const DisplayMoviesInListModal = function(props) {
 const [state, setState] = useState({ movies: [] , movieId: -1});

  const classes = useStyles();
  const {toggleMoviesInListModal, onClickCloseMoviesInMovieListModal} = props;
  const {list} = props;

  const loadUserMovies = async function(){
    const userId = sessionStorage.getItem("userId");
    const listId = props.list.listId;
    const results = await getMoviesFromMovieList(userId, listId);

    let movies = results.map(({movieId, movieImage, movieName, movieDescription, movieRatingAverage}) => {
        return {
          movieId,
          movieName,
          movieDescription,
          movieImage:  movieImage.includes('t/p/original') ? movieImage : `https://www.themoviedb.org/t/p/original${movieImage}`,
          movieRatingAverage
        };
    });


    setState(prevState => ({
      ...prevState,
      movies: movies
    }));
  }


  useEffect(() => {
      loadUserMovies();
  }, []);

  const onClickDeleteMovieFromList = async function(e, movieId) {
    e.stopPropagation();
    const userId = sessionStorage.getItem("userId");
    const listId = list.listId;
    const result = await deleteMovieFromMovieList(userId, listId, movieId);
    console.log(result);
    if(result.status === 200){
      loadUserMovies();
    }
  };

  const {movies} = state;


  return (
    <Modal
      open={toggleMoviesInListModal}
      onClose={onClickCloseMoviesInMovieListModal}
      closeAfterTransition
      className={classes.movieListModal}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Slide in={toggleMoviesInListModal}>
        <Box className={classes.movieListModalContainer}>
          <h1 className={classes.yourMovieTitle}>Your Movies</h1>
          <Box className={classes.movieListModalMoviesContainer}>
            {movies.map(movie => {
              return (
                <MovieDeleteCard
                  onClickDeleteMovieFromList={onClickDeleteMovieFromList}
                  key={movie.movieId}
                  displayToolTip={movie.movieId === state.movieId}
                  movie={movie}
                />
              );
            })}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
};

export default DisplayMoviesInListModal;
