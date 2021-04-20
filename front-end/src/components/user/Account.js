import {Box, makeStyles, IconButton, Button} from '@material-ui/core';
import { getUserLists, editUserList } from "../movielist/movie-list-routes";
import {getUserInformationById} from '../user/user-routes';
import {Link} from 'react-router-dom';
import AccountMovieLists from './AccountMovieLists';
import EditMovieListModal from './EditMovieListModal';
import { searchMovie } from "../dashboard/dashboard-routes";
import DashboardSearch from "../dashboard/DashboardSearch";
import SearchIcon from "@material-ui/icons/Search";
import {useState, useEffect} from 'react';
import DeleteMovieListModal from './DeleteMovieListModal';
import clsx from 'clsx';
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles(() => ({
  accountRoot: {
    height: "100%",
    width: "100%",
    backgroundColor: "#131b21"
  },
  accountContainer: {
    margin: '50px auto 0px auto',
    width: '90%'
  },
  accountNavUser: {
    width: '550px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  userProfileDetails: {
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat, sans-serif"
  },
  userProfileName: {
    fontSize: "1.2em",
  },
  userProfileEmail: {
    fontSize: "1em",
  },
  accountNav: {
    display: "flex",
    margin: "0 auto",
    justifyContent: "space-between",
    alignItems: "center",
    width: '95%'
  },
  accountNavContent: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    marginRight: "10px"
  },
  accountSubLinks: {
    fontSize: "1em",
    fontFamily: "Montserrat, sans-serif"
  },
  navButtons: {
    color: "white",
    fontSize: "1.2em",
    color: "white",
    transition: "all .4s ease-out",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  searchIconButton: {
    fontSize: ".9em",
    color: "rgb(230,191,27)",
    fontFamily: "Montserrat, sans-serif",
    transition: "all .4s ease-out",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  searchIcon: {
    marginRight: "5px"
  },
  alertSuccess: {
    width: '100%',
    position: 'absolute'
  }
}));

const Account = function(){
    const [state, setState] = useState({
      toggleSearchModal: false,
      toggleEditListModal: false,
      toggleDeleteMovieListModal: false,
      toggleMoviesInMovieListModal: false,
      keyWord: "",
      results: [],
      userId: sessionStorage.getItem("userId"),
      lists: [],
      user: {},
      loading: true,
      listToEdit: {},
      listName: '',
      listDescription: '',
      listToDelete: {},
      editError: false,
      editErrorMessage: '',
      editSuccess: false,
      editSuccessMessage: ''
    });

    const loadUserInformation = async function(){
        const user = await getUserInformationById(state.userId);
        const lists = await getUserLists(state.userId);

        setState(prevState => ({
          ...prevState,
          lists: Array.isArray(lists) ? lists : [],
          loading: false,
          user: user
        }));
    }

    const loadUserLists = async function(){
        const lists = await getUserLists(state.userId);
        
        setState(prevState => ({
            ...prevState,
            lists: Array.isArray(lists) ? lists: [],
            loading: false
        }));
    }


    useEffect(() => {
        loadUserInformation();
    }, []);

    const onClickOpenSearchModal = function() {
      setState(prevState => ({
        ...prevState,
        toggleSearchModal: true
      }));
    };

    const onClickCloseSearchModal = function() {
      setState(prevState => ({
        ...prevState,
        toggleSearchModal: false
      }));
    };

    const onChangeTriggerSearch = async function(e) {
      const { value } = e.target;
      const data = await searchMovie(value, 1);

      const searchResults = data.results || [];

      setState(prevState => ({
        ...prevState,
        results: searchResults
      }));
    };

    const onClickOpenMovieListModal = function(e, list){
        e.stopPropagation();
        setState({...state, toggleEditListModal: true, listToEdit: list})
    }

    const onClickCloseMovieListModal = function(e) {
        e.stopPropagation();
        setState({ ...state, toggleEditListModal: false });
    };

    const onClickOpenDeleteMovieListModal = function(e,list){
        e.stopPropagation();
        setState({...state, toggleDeleteMovieListModal: true, listToDelete: list})
    }

    const onClickCloseDeleteMovieListModal = function(e){
        e.stopPropagation();
        setState({ ...state, toggleDeleteMovieListModal: false });
    }

    const onSubmitEditList = async function(e) {
      e.preventDefault();
      const { listId, userId } = listToEdit;
      const { listName, listDescription } = state;
      const result = await editUserList(
        userId,
        listId,
        listName,
        listDescription
      );
      if (result.status === 201) {
        setState(prevState => ({
          ...prevState,
          listToEdit: {},
          listName: '',
          listDescription: '',
          editError: false,
          editErrorMessage: '',
          editSuccess: true,
          editSuccessMessage: `Successfully edited to ${listName}`
        }));
        await onClickCloseMovieListModal(e);
        await loadUserLists();

        setTimeout(() => {
          setState(prevState => ({...prevState, editSuccess: false, editSuccessMessage: '', editError: false, editErrorMessage: ''}));
        }, 1500);

      } else {
        setState(prevState => ({
               ...prevState,
               editError: true,
               editErrorMessage: result.message
             }));
      }
    };

    const onChangeEditList = function(e) {
      const { name, value } = e.target;

      setState(prevState => ({
        ...prevState,
        [name]: value
      }));
    };






    const classes = useStyles();
    const {
      toggleSearchModal,
      results,
      lists,
      loading,
      toggleEditListModal,
      toggleDeleteMovieListModal,
      listToEdit,
      listToDelete,
      editError,
      editErrorMessage,
      editSuccess,
      editSuccessMessage
    } = state;

    if(loading)
        return <h1>Currently loading</h1>


    return (
      <Box className={classes.accountRoot}>
        <Box className={classes.accountNav}>
        <Box className={classes.accountNavUser} >
            <h2 className={clsx(classes.userProfileName, classes.userProfileDetails)} >Name: {state.user.userFirstName} {state.user.userLastName}  </h2>
            <h2 className={clsx(classes.userProfileEmail, classes.userProfileDetails)} >Email: {state.user.userEmail}</h2>
        </Box>
          <Box className={classes.accountNavContent}>
            <IconButton
              onClick={onClickOpenSearchModal}
              className={classes.searchIconButton}
            >
              <SearchIcon className={classes.searchIcon} />
              SEARCH
            </IconButton>
            <span className={classes.accountSubLinks}>
              <Button>
                <Link className={classes.navButtons} to="/dashboard">
                  DASHBOARD
                </Link>
              </Button>
            </span>
            <span className={classes.accountSubLinks}>
              <Button>
                <Link className={classes.navButtons} to="/account">
                  ACCOUNT
                </Link>
              </Button>
            </span>
            <DashboardSearch
              results={results}
              onChangeTriggerSearch={onChangeTriggerSearch}
              toggleSearchModal={toggleSearchModal}
              onClickCloseSearchModal={onClickCloseSearchModal}
              onClickOpenSearchModal={onClickOpenSearchModal}
            />
          </Box>
        </Box>

        {editSuccess && <Alert severity="success">{editSuccessMessage}</Alert>}

        <Box className={classes.accountContainer}>
          <AccountMovieLists
            onClickOpenDeleteMovieListModal={onClickOpenDeleteMovieListModal}
            onClickOpenMovieListModal={onClickOpenMovieListModal}
            loading={loading}
            lists={lists}
          />
          <EditMovieListModal
            loadUserLists={loadUserLists}
            error={editError}
            errorMessage={editErrorMessage}
            onSubmit={onSubmitEditList}
            onChange={onChangeEditList}
            listToEdit={listToEdit}
            onClickCloseMovieListModal={onClickCloseMovieListModal}
            toggleEditListModal={toggleEditListModal}
          />

          <DeleteMovieListModal
            listToDelete={listToDelete}
            loadUserLists={loadUserLists}
            toggleDeleteMovieListModal={toggleDeleteMovieListModal}
            onClickCloseDeleteMovieListModal={onClickCloseDeleteMovieListModal}
          />
        </Box>
      </Box>
    );
}

export default Account;