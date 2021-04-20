import {useState} from 'react';
import {Box, Button} from '@material-ui/core';
import {withRouter} from 'react-router';
import {makeStyles} from '@material-ui/core';
import { createMovieList } from "../movielist/movie-list-routes";
import MovieListModal from "../movielist/MovieListModal";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles(() => ({
  dashboardColumnRoot: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-10px 0 10px black"
  },
  dashboardColumnContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    margin: "0 auto",
    top: "0",
    color: "white"
  },
  dashboardColumnRow: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  userProfileHeader: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "1.4em",
    fontFamily: "Montserrat, sans-serif"
  },
  logoTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: "2em",
    padding: "20px 0 0 20px",
    letterSpacing: "0.05em",
    height: "fit-content",
    width: "fit-content",
    color: "rgb(230,191,27)"
  },
  userListCreateListButton: {
    width: "100%",
    color: "rgb(230,191,27)",
    transition: "all .4s ease-out",
    marginTop: "20px",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  yourListsTitle: {
    color: "rgb(230,191,27)",
    fontSize: "1.1em",
    fontFamily: "Montserrat, sans-serif"
  },
  yourListsDescription: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "0.9em"
  },
  alertSuccess: {
    position: "absolute",
    width: "100%"
  }
}));

const DashboardUserColumn = function(props){
    const [state, setState] = useState({listName: '', listDescription: '', success: false, successMessage: '',  error: false, errorMessage: ''});


    const {
      userLists,
      userId,
      user,
      loadUserMovieList,
      toggleCreateMovieListModal,
      onClickCloseCreateMovieListModal,
      onClickOpenCreateMovieListModal,
      loadingDashboard
    } = props;
    const classes = useStyles();

    const onClickGoToUserProfile = function(){
        props.history.push({
            pathname: '/account',
            state: {
                userId: userId
            }
        })
    }

    const onSubmit = async function(e){
      e.preventDefault();
      const {listName, listDescription} = state;
      const response = await createMovieList(props.userId, listName, listDescription);
      if(response.status === 201){
        setState({listName: '', listDescription: '', success: true, successMessage: ` Successfuly made ${listName}`, error: false})
        await loadUserMovieList();
        onClickCloseCreateMovieListModal();
        setTimeout(() => {
          setState((prevState) => ({...prevState, success: false, successMessage: ''}));
        }, 1500);
      } else {
        setState((prevState) => ({...prevState, error: true, errorMessage: response.message}))
      }
    }

    const onChange = function(e){
      const {name, value} = e.target;
      setState({...state, [name]: value});
    }

    const {success, error, errorMessage, successMessage} = state;


    return (
      <Box className={classes.dashboardColumnRoot}>
        {success && (
          <Alert className={classes.alertSuccess} severity="success">
            {successMessage}
          </Alert>
        )}
        <Box className={classes.dashboardColumnContainer}>
          <Box className={classes.dashboardColumnRow}>
            <h1 className={classes.logoTitle}>MovieU</h1>
            <h3
              title="Account"
              className={classes.userProfileHeader}
              onClick={onClickGoToUserProfile}
            >
              {user.userFirstName} {user.userLastName}
            </h3>
          </Box>
          <Box className={classes.dashboardColumnRow}>
            <h3 className={classes.yourListsTitle}>Your Lists</h3>
            {userLists.length > 0 ? (
              userLists.map(userList => {
                return (
                  <p
                    className={classes.yourListsDescription}
                    key={userList.listId}
                  >
                    {userList.listName}
                  </p>
                );
              })
            ) : (
              <p>You have no movie lists.</p>
            )}
            <Button
              onClick={onClickOpenCreateMovieListModal}
              className={classes.userListCreateListButton}
              type="text"
            >
              Create New List
            </Button>
          </Box>
        </Box>
        <MovieListModal
          userId={userId}
          onChange={onChange}
          onSubmit={onSubmit}
          success={success}
          error={error}
          errorMessage={errorMessage}
          loadUserMovieList={loadUserMovieList}
          toggleCreateMovieListModal={toggleCreateMovieListModal}
          onClickCloseCreateMovieListModal={onClickCloseCreateMovieListModal}
        />
      </Box>
    );
}

const DashboardUserColumnWithRouter = withRouter(DashboardUserColumn);
export default DashboardUserColumnWithRouter;