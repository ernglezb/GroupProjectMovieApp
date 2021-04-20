import { useState } from "react";
import {withRouter} from 'react-router';
import {Box, Button, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";
import DashboardSearch from './DashboardSearch';
import {searchMovie} from './dashboard-routes';


const useStyles = makeStyles(() => ({
  dashboardNavRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Montserrat, sans-serif"
  },
  dashboardNavTitle: {},
  dashboardNavButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dashboardNavFilterButtonContainer: {
    width: "600px"
  },

  dashboardNavButton: {
    color: "rgb(230,191,27)",
    fontFamily: "Montserrat, sans-serif",
    marginLeft: "10px",
    transition: "all .4s ease-out",
    "&:hover": {
      transform: "scale(1.1)"
    },
    "&:first-child": {
      marginLeft: "0px"
    }
  },
  dashboardNavIconButton: {
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
  }
}));


 
const DashboardNav = function(props){
  const [state, setState] = useState({toggleSearchModal: false, keyWord: '', page: 1, results: []});

    const classes = useStyles();
    const {onClickChangeMovieFilter} = props;

    const onClickOpenSearchModal = function(){
      setState((prevState) => ({
        ...prevState,
        toggleSearchModal: true
      }))
    }

    const onClickCloseSearchModal = function() {
      setState(prevState => ({
        ...prevState,
        toggleSearchModal: false
      }));
    };

    const onChangeTriggerSearch = async function(e) {
      const {value} = e.target;
      const data = await searchMovie(value, 1);

      const searchResults = data.results || [];

      setState((prevState) => ({
        ...prevState,
        results: searchResults
      }))
    };


    const {toggleSearchModal, results, logout} = state;
    const { onClickLogOut, onClickGoToAccount } = props;

    return (
      <Box className={classes.dashboardNavRoot}>
        <h1 className={classes.dashboardNavTitle}>Discover</h1>
        <Box className={classes.dashboardNavButtonContainer}>
          <Box className={classes.dashboardNavFilterButtonContainer}>
            <Button
              onClick={() => onClickChangeMovieFilter("popular")}
              variant="text"
              className={classes.dashboardNavButton}
            >
              Popular
            </Button>
            <Button
              onClick={() => onClickChangeMovieFilter("now_playing")}
              variant="text"
              className={classes.dashboardNavButton}
            >
              Now Playing
            </Button>
            <Button
              onClick={() => onClickChangeMovieFilter("recommended")}
              variant="text"
              className={classes.dashboardNavButton}
            >
              Recommended
            </Button>
            <Button
              onClick={() => onClickChangeMovieFilter("recently_added")}
              variant="text"
              className={classes.dashboardNavButton}
            >
              Recently Added
            </Button>
          </Box>
          <IconButton
            onClick={onClickOpenSearchModal}
            className={classes.dashboardNavIconButton}
          >
            <SearchIcon className={classes.searchIcon} />
            SEARCH
          </IconButton>
          <Button
            variant="text"
            className={classes.dashboardNavButton}
            onClick={onClickLogOut}
          >
            Logout
          </Button>
          <Button
            variant="text"
            className={classes.dashboardNavButton}
            onClick={onClickGoToAccount}
          >
            Account
          </Button>
        </Box>
        <DashboardSearch
          results={results}
          onChangeTriggerSearch={onChangeTriggerSearch}
          toggleSearchModal={toggleSearchModal}
          onClickCloseSearchModal={onClickCloseSearchModal}
          onClickOpenSearchModal={onClickOpenSearchModal}
        />
      </Box>
    );
}

const DashboardNavWithRouter = withRouter(DashboardNav)
export default DashboardNavWithRouter;