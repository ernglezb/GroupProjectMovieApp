import {useState} from 'react';
import { Box, Slide, Modal, Backdrop, makeStyles } from "@material-ui/core";
import EditMovieListForm from './EditMovieListForm';

const useStyles = makeStyles(() => ({
  movieListModalRoot: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  movieListModalContainer: {
    backgroundColor: "white",
    left: "0",
    right: "0",
    top: "10%",
    position: "absolute",
    margin: "0 auto",
    width: "500px",
    height: "300px"
  },
  editMovieListError: {
    textAlign: 'center',
    color: 'red'
  }
}));


const EditMovieListModal = function(props){

    const classes = useStyles();
    const {
      toggleEditListModal,
      onClickCloseMovieListModal,
      listToEdit,
      onSubmit,
      onChange,
      error,
      errorMessage
    } = props;


    return (
      <Modal
        aria-labelledby="List Title"
        aria-describedby="List Description"
        className={classes.movieListModalRoot}
        open={toggleEditListModal}
        onClose={onClickCloseMovieListModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Slide in={toggleEditListModal}>
          <Box className={classes.movieListModalContainer}>
            <EditMovieListForm
              error={error}
              errorMessage={errorMessage}
              onSubmit={onSubmit}
              onChange={onChange}
              listToEdit={listToEdit}
            />
            {<h3 className={classes.editMovieListError}>{error}</h3>}
          </Box>
        </Slide>
      </Modal>
    );
}

export default EditMovieListModal;