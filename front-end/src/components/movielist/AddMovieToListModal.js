import { useState } from "react";
import { Box, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import AddMovieToListForm from "./AddMovieToListForm";
import Alert from "@material-ui/lab/Alert";
import {addMovieToPlaylist} from './movie-list-routes';

const useStyles = makeStyles(() => ({
  addMovieToMovieListModalRoot: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  addMovieToMovieListModalContainer: {
    backgroundColor: "white",
    left: "0",
    right: "0",
    top: "20%",
    position: "absolute",
    margin: "0 auto",
    width: "500px",
    height: "300px"
  },
  selectListTitle: {
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif"
  },
  alertMessage: {
    height: '40px',
    minHeight: '40px'
  }
}));

const DashboardAddMovieToListModal = function(props){
  const [state, setState] = useState({listNameSelected: '', listIdSelected: 0, success: false, error: false, errorMessage: '', successMessage: ''})

  const classes = useStyles();


  const onSubmit = async function(e){
    e.preventDefault();
    const response = await addMovieToPlaylist(sessionStorage.getItem('userId'), state.listIdSelected, props.movieIdToAddToList);
    if(response.status === 201){
      setState({listNameSelected: '', listIdSelected: 0, success: true, error: false, errorMessage: '', successMessage: response.message});
      setTimeout(() => {
        onClickCloseAddMovieToMovieListModal(e);
        setState(prevState => ({ ...prevState, success: false, successMessage: "" }));
      }, 1500);
    } else {
      setState(prevState => ({...prevState, error: true, success: false, errorMessage: response.message}));
    }
  }

  const onChange = function(e){
    const {value} = e.target;

    const userList = props.userLists.filter((list) => list.listName === value);

    setState((prevState) => ({
      ...prevState,
      listNameSelected: value,
      listIdSelected: userList[0].listId
    }));
  }

  const onClickCloseModal = function(e){
    e.stopPropagation();
    setState(prevState => ({...prevState, error: false, success: false, errorMessage: '', successMessage: '', listNameSelected: '', listIdSelected: 0}))
    props.onClickCloseAddMovieToMovieListModal(e);
  }


  const { listNameSelected, error, success, successMessage, errorMessage } = state;
  const {
    toggleAddMovieToMovieListModal,
    onClickCloseAddMovieToMovieListModal,
    userLists,
  } = props;


    return (
      <Modal
        aria-labelledby="List Title"
        aria-describedby="List Description"
        className={classes.addMovieToMovieListModalRoot}
        open={toggleAddMovieToMovieListModal}
        onClose={onClickCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Slide in={toggleAddMovieToMovieListModal}>
          <Box className={classes.addMovieToMovieListModalContainer}>
            {userLists.length !== 0 && <h2 className={classes.selectListTitle}>Select a list.</h2>}
            {error && (
              <Alert className={classes.alertMessage} severity="error">
                {errorMessage}
              </Alert>
            )}
            {success && (
              <Alert className={classes.alertMessage} severity="success">
                {successMessage}
              </Alert>
            )}
            <AddMovieToListForm
              onClickCloseAddMovieToMovieListModal={
                onClickCloseAddMovieToMovieListModal
              }
              onSubmit={onSubmit}
              onChange={onChange}
              listNameSelected={listNameSelected}
              userLists={userLists}
            />
          </Box>
        </Slide>
      </Modal>
    );

}


export default DashboardAddMovieToListModal;