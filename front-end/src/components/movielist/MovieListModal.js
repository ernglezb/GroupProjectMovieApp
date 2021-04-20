import {useState} from 'react';
import {Box, Slide, Modal, Backdrop, makeStyles} from '@material-ui/core';
import {createMovieList} from './movie-list-routes';
import MovieListForm from './MovieListForm';


const useStyles = makeStyles(() => ({
    movieListModalRoot: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieListModalContainer: {
      backgroundColor: 'white',
      left: '0',
      right: '0',
      top: '30%',
      position: 'absolute',
      margin: '0 auto',
      width: '500px',
      height: '300px'
    }
}));

const MovieListModal = function(props){

    const {
      toggleCreateMovieListModal,
      onClickCloseCreateMovieListModal,
      onSubmit,
      onChange,
      error,
      errorMessage,
    } = props;

    const classes = useStyles();

    return (
      <Modal
        aria-labelledby="List Title"
        aria-describedby="List Description"
        className={classes.movieListModalRoot}
        open={toggleCreateMovieListModal}
        onClose={onClickCloseCreateMovieListModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Slide in={toggleCreateMovieListModal}>
          <Box className={classes.movieListModalContainer}>
            <MovieListForm error={error} errorMessage={errorMessage} onSubmit={onSubmit} onChange={onChange} />
          </Box>
        </Slide>
      </Modal>
    );
}

export default MovieListModal;