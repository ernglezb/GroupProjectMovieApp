import { useState, useEffect } from "react";
import {makeStyles, Box} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import {baseRoute} from '../../api/api-routes';
import {withRouter} from 'react-router';
import { getUserInformationById } from "../user/user-routes";
import {loadDashboard} from './dashboard-routes';
import DashboardNav from './DashboardNav';
import DashboardMovies from './DashboardMovies';
import DashboardUserColumn from "./DashboardUserColumn";
import AddMovieToListModal from "../movielist/AddMovieToListModal";
import LoadingSpinner from "../spinner/LoadingSpinner";


const useStyles = makeStyles(() => ({
  dashboardRoot: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#131b21",
    position: "relative"
  },
  dashboardContainer: {
    width: "90%",
    height: "100%",
    color: "white",
    flex: "5"
  },
  dashboardContent: {
    width: "90%",
    margin: "0 auto"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "40px auto"
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "white"
    },
    "& .Mui-selected": {
      color: 'black',
      backgroundColor: "rgb(230,191,27)"
    }
  }
}));


const Dashboard = function(props){
    const [state, setState] = useState({
      page: 1,
      userId: sessionStorage.getItem("userId"),
      user: {},
      movieIdToAddToList: 0,
      listIdToPlaceMovie: 0,
      loadingDashboard: true,
      totalPages: 0,
      totalResults: 0,
      movieType: "popular",
      toggleCreateMovieListModal: false,
      toggleAddMovieToMovieListModal: false,
      displayAddMovieToMovieListModal: false,
      movieListCreated: false,
      movies: [],
      userLists: [],
      recentlyAddedMovies: [],
      recommendedMovies: [],
      logout: false,
      loadAccount: false
    });

    const classes = useStyles();

    useEffect(() => {
      loadUserInformation();
      loadMovies();
      
    }, [state.page, state.movieType])

        // ---------------------------------------------------- LOAD DB FUNCTIONS ----------------------------------------- //

    const loadUserInformation = async function() {
      const user = await getUserInformationById(sessionStorage.getItem("userId"));

      setState(prevState => ({
        ...prevState,
        user: user
      }));
    };

    const loadMovies = async function(){
        const {movieType, page} = state;

        let updatedMovies = [];
        let totalPages = 0;
        let totalResults = 0;

        if(movieType === 'popular' || movieType === 'now_playing'){

          const url = `https://api.themoviedb.org/3/movie/${movieType}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
          const response = await fetch(url);
          const data = await response.json();

          let movies = data.results.map(({id, poster_path, title, overview, release_date, vote_average}) => {
              return {
                movieId: id,
                movieName: title,
                movieDescription: overview,
                movieRevenue: 0,
                movieImage: `https://www.themoviedb.org/t/p/original/${poster_path}`,
                movieReleaseDate: release_date,
                movieRatingAverage: vote_average
              };
          });

          updatedMovies = movies;
          totalPages = data.total_pages;
          totalResults = data.total_results;
          
        } else if(movieType === "recommended") {
          const result = await loadDashboard(state.userId);
          if(result.status === 200)
            updatedMovies = result.recommendedMovies;
        } else if(movieType === "recently_added"){
          const result = await loadDashboard(state.userId);
          if(result.status === 200)
            updatedMovies = result.recentlyAddedMovies
        }
        setState(prevState => ({
          ...prevState,
          movies: updatedMovies, totalPagess: totalPages, totalResults: totalResults
        }));
        loadUserMovieList();
    }

    const loadUserMovieList = async function(){
      const userId = sessionStorage.getItem("userId");
      const apiUrl = `${baseRoute}/user/${userId}/list`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          userId: userId,
          userLists: Array.isArray(data) ? data : [],
          loadingDashboard: false
        }));
      }, 1000);
    }

// ---------------------------------------------------- ON CLICK FUNCTIONS ----------------------------------------- //

    const onPageClickGoToPage = function(e, v){
      window.scrollTo(0,0);
      setState((prevState) => ({
          ...prevState,
          page: v
      }));
    }

    const onClickChangeMovieFilter = function(filter){
      setState((prevState) => ({
        ...prevState,
          movieType: filter,
          page: 1
      }));
    }

    // ----------------------- ADD MOVIE MODAL --------------------------------------

    const onClickCloseAddMovieToMovieListModal = function(e) {
      e.stopPropagation();
      setState({ ...state, toggleAddMovieToMovieListModal: false });
    };

    const onClickOpenAddMovieToMovieListModal = function(e) {
      e.stopPropagation();
      setState({ ...state, toggleAddMovieToMovieListModal: true });
    };

    const movieToAddToList = function(movieId){
      setState({...state, movieIdToAddToList: movieId});
    }

// ----------------------- CREATE LIST MODAL --------------------------------------

    const onClickCloseCreateMovieListModal = function() {
      setState((prevState) => ({
         ...prevState, 
         toggleCreateMovieListModal: false 
      }));
    };

    const onClickOpenCreateMovieListModal = function() {
      setState((prevState) => ({
        ...prevState,
        toggleCreateMovieListModal: true 
      }));
    };

    const onClickLogOut = function() {
      sessionStorage.setItem("userId", "");
      setState(prevState => ({
        ...prevState,
        logout: true
      }));

      setTimeout(() => {
        props.history.push({
          pathname: "/"
        });
      }, 1500);
    };

  const onClickGoToAccount = function() {
    setState(prevState => ({
      ...prevState,
      loadAccount: true
    }));

    setTimeout(() => {
      setState(prevState => ({...prevState,loadAccount: false}))
      props.history.push({
        pathname: "/account"
      });
    }, 1500);
  };


    const {toggleCreateMovieListModal,toggleAddMovieToMovieListModal, userLists, userId, movies, loadingDashboard,page, movieIdToAddToList, user, logout, totalResults, loadAccount, movieType} = state;

    if(logout || loadAccount)
      return <LoadingSpinner />


    return (
      <Box className={classes.dashboardRoot}>
        <Box className={classes.dashboardContainer}>
          <Box className={classes.dashboardContent}>
            <DashboardNav
              onClickGoToAccount={onClickGoToAccount}
              onClickLogOut={onClickLogOut}
              onClickChangeMovieFilter={onClickChangeMovieFilter}
            />
            <DashboardMovies
              movieType={movieType}
              movieToAddToList={movieToAddToList}
              loadingDashboard={loadingDashboard}
              onClickCloseAddMovieToMovieListModal={
                onClickCloseAddMovieToMovieListModal
              }
              onClickOpenAddMovieToMovieListModal={
                onClickOpenAddMovieToMovieListModal
              }
              toggleAddMovieToMovieListModal={toggleAddMovieToMovieListModal}
              movies={movies}
            />
          </Box>
          <Box className={classes.paginationContainer}>
            <Pagination
              page={page}
              count={Math.round(totalResults / 20)}
              onChange={onPageClickGoToPage}
              classes={{
                ul: classes.pagination,
              }}
              size="large"
            />
          </Box>
        </Box>

        <AddMovieToListModal
          userLists={userLists}
          movieIdToAddToList={movieIdToAddToList}
          onClickCloseAddMovieToMovieListModal={
            onClickCloseAddMovieToMovieListModal
          }
          toggleAddMovieToMovieListModal={toggleAddMovieToMovieListModal}
        />

        <DashboardUserColumn
          loadingDashboard={loadingDashboard}
          toggleCreateMovieListModal={toggleCreateMovieListModal}
          onClickCloseCreateMovieListModal={onClickCloseCreateMovieListModal}
          onClickOpenCreateMovieListModal={onClickOpenCreateMovieListModal}
          loadUserMovieList={loadUserMovieList}
          userLists={userLists}
          user={user}
          userId={userId}
        />
      </Box>
    );
}

const DashboardRouter = withRouter(Dashboard);

export default DashboardRouter;