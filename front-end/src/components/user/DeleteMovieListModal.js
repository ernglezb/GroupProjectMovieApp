import { useState } from "react";
import { Box, Slide, Modal, Backdrop, makeStyles, Button } from "@material-ui/core";
import { deleteUserList } from "../movielist/movie-list-routes";
import EditMovieListForm from "./EditMovieListForm";

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
    top: "40%",
    position: "absolute",
    margin: "0 auto",
    width: "350px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  movieListModalForm: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    margin: "0 auto"
  },
  movieListModalFormButton: {
    background: "rgb(230,191,27)"
  },
  editMovieListError: {
    textAlign: "center",
    color: "red"
  }
}));

const DeleteMovieListModal = function(props) {
  const [state, setState] = useState({error: ""});

  const classes = useStyles();
  const {
    toggleDeleteMovieListModal,
    onClickCloseDeleteMovieListModal,
    listToDelete,
    loadUserLists
  } = props;

  const onSubmit = async function(e) {
    e.preventDefault();
    const {userId, listId} = props.listToDelete;
    const result = await deleteUserList(userId, listId);
    
    if(result.status === 200){
        setState({error: ''})
        onClickCloseDeleteMovieListModal(e);
        loadUserLists();
    } else {
        setState({error: result.message});
    }


  };

  return (
    <Modal
      className={classes.movieListModalRoot}
      open={toggleDeleteMovieListModal}
      onClose={onClickCloseDeleteMovieListModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Slide in={toggleDeleteMovieListModal}>
        <Box className={classes.movieListModalContainer}>
          <h3>Are you sure you want to delete this?</h3>
          <form className={classes.movieListModalForm} onSubmit={onSubmit}>
            <Button className={classes.movieListModalFormButton} type="submit" >Yes</Button>
            <Button className={classes.movieListModalFormButton} onClick={(e) => onClickCloseDeleteMovieListModal(e)}>No</Button>
          </form>
        </Box>
      </Slide>
    </Modal>
  );
};

export default DeleteMovieListModal;
