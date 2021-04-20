import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Box, IconButton, Button} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { useEffect } from 'react';
import {
  fetchMovieById,
  fetchMovieVideosByMovieId,
  fetchSimilarMoviesByMovieId
} from "./movie-routes";
import {
  getUserLists
} from '../movielist/movie-list-routes';
import AddMovieToListModal from '../movielist/AddMovieToListModal';
import { searchMovie } from "../dashboard/dashboard-routes";
import YouTube from 'react-youtube';
import MovieCard from './MovieCard';
import DashboardSearch from '../dashboard/DashboardSearch';
import LoadingSpinner from '../spinner/LoadingSpinner';

const useStyles = makeStyles(() => ({
  movieDetailRoot: {
    position: "relative",
    backgroundColor: "#131b21"
  },
  movieDetailContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    margin: "0px auto",
    paddingTop: "20px"
  },
  movieDetailHeader: {
    display: "flex",
    flexDirection: "column"
  },
  movieDetailHeaderTitle: {
    fontSize: "2em",
    fontFamily: "Montserrat, sans-serif",
    color: "white"
  },
  movieDetailNav: {
    width: "400px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  movieDetailHeaderSearch: {
    fontSize: "1em",
    fontFamily: "Montserrat, sans-serif",
    color: "white",
    transition: "all .4s ease-out",
    "&:hover": {
      transform: "scale(1.1)"
    }
  },
  movieDetailSubHeader: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "space-between",
    width: "800px",
    color: "white"
  },
  movieDetailSubHeaderSpan: {
    color: "lightgray",
    fontFamily: "Montserrat, sans-serif",
    marginRight: "5px"
  },
  navButtons: {
    color: "white",
    fontSize: "1.2em"
  },
  movieDetailHeaderRowOne: {
    display: "flex",
    justifyContent: "space-between"
  },
  movieDetailPoster: {
    minWidth: "500px",
    minHeight: "500px",
    width: "500px",
    height: "500px"
  },
  movieContent: {
    display: "flex",
    marginTop: "50px",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  movieDescription: {
    fontFamily: "Montserrat, sans-serif",
    color: "white",
    lineHeight: "2em"
  },
  movieDetailSectionTitle: {
    color: "white",
    fontSize: "1.5em",
    color: "rgb(230,191,27)",
    fontFamily: "Montserrat, sans-serif"
  },
  movieInfo: {
    flex: "4",
    marginRight: "200px"
  },
  movieTrailers: {
    flex: "1"
  },

  similarMovieContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "50px"
  },
  similarMovieContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "50px"
  },
  movieMinorDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "25px",
    width: "500px"
  },
  movieMinorDetailTitle: {
    fontSize: "1.1em",
    color: "white"
  },
  similarMoviesNotFoundMessage: {
    color: "white",
    marginBottom: "100px",
    fontFamily: "Montserrat, sans-serif"
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
  movieTrailerVideos: {
    minHeight: "650px"
  },
  addMovieButton: {
    color: "rgb(230,191,27)",
    marginTop: '10px',
    fontFamily: "Montserrat, sans-serif"
  }
}));


const MovieDetail = function(props){
    const [state, setState] = useState({
      movie: {},
      videos: [],
      similarMovies: [],
      results: [],
      userLists: [],
      loading: true,
      toggleAddMovieToMovieListModal: false,
      toggleSearchModal: false,
      movieId: 0,
      page: 1,
      keyWord: "",
    });


    const classes = useStyles();

    const loadMovieDetails = async function(){
        window.scrollTo(0,0);
        const movieId = props.history.location.state.movieId;
        const movie = await fetchMovieById(movieId);
        const videosData = await fetchMovieVideosByMovieId(movieId)
        const videos = videosData.results.slice(0, 3);
        const similarMoviesData = await fetchSimilarMoviesByMovieId(movieId);
        const similarMovies = similarMoviesData.slice(0, 3);
        setState(prevState => ({
          ...prevState,
          movie: movie,
          loading: false,
          videos: videos,
          similarMovies: similarMovies
        }));
    }

    useEffect(async () => {
        loadMovieDetails();
    }, [window.location.href])

    const onHoverDisplayToolTip = function(id){
        setState(prevState => ({...prevState, movieId: id}))
    }

    const onClickCloseAddMovieToMovieListModal = function(e) {
        e.stopPropagation();
        setState(prevState => ({ ...prevState, toggleAddMovieToMovieListModal: false }));
    };

    const onClickOpenAddMovieToMovieListModal = async function(e) {
        e.stopPropagation();
        const userLists = await getUserLists(sessionStorage.getItem("userId"));
        setState(prevState => ({ ...prevState, toggleAddMovieToMovieListModal: true, userLists: Array.isArray(userLists) ? userLists: [] }));
    };

    
    const onClickAddMovieToMovieList = async function(e, movieId) {
        e.stopPropagation();

    };

    const onClickOpenSearchModal = function() {
      setState(prevState => ({
        ...prevState,
        toggleSearchModal: true
      }));
    };

    const onClickCloseSearchModal = function() {
      setState(prevState => ({
        ...prevState,
        toggleSearchModal: false,
        results: []
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

    const {movieName, movieDescription, movieRevenue, movieReleaseDate, movieRatingAverage, movieImage, movieBudget, movieId, movieRuntime} = state.movie;
    const {loading, videos, similarMovies, results, toggleSearchModal,toggleAddMovieToMovieListModal, userLists} = state;


    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    if(loading)
        return <LoadingSpinner />

    return (
      <Box className={classes.movieDetailRoot}>
        <Box className={classes.movieDetailContainer}>
          <Box className={classes.movieDetailHeader}>
            <Box className={classes.movieDetailHeaderRowOne}>
              <span className={classes.movieDetailHeaderTitle}>
                {movieName.toUpperCase()}
              </span>
              <Box className={classes.movieDetailNav}>
                <IconButton
                  onClick={onClickOpenSearchModal}
                  className={classes.searchIconButton}
                >
                  <SearchIcon className={classes.searchIcon} />
                  SEARCH
                </IconButton>
                <span className={classes.movieDetailHeaderSearch}>
                  <Button>
                    <Link className={classes.navButtons} to="/dashboard">
                      DASHBOARD
                    </Link>
                  </Button>
                </span>
                <span className={classes.movieDetailHeaderSearch}>
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

            <AddMovieToListModal
              toggleAddMovieToMovieListModal={toggleAddMovieToMovieListModal}
              onClickCloseAddMovieToMovieListModal={
                onClickCloseAddMovieToMovieListModal
              }
              userLists={userLists}
              movieIdToAddToList={movieId}
            />

            <Box className={classes.movieDetailSubHeader}>
              <span>
                <span className={classes.movieDetailSubHeaderSpan}>
                  Release Date:
                </span>
                {movieReleaseDate}
              </span>
              <span>
                <span className={classes.movieDetailSubHeaderSpan}>
                  Country:
                </span>
                USA
              </span>
              <span className={classes.movieDetailSubHeaderSpan}>
                Runtime: {movieRuntime} min
              </span>
            </Box>
          </Box>

          <Box className={classes.movieContent}>
            <Box className={classes.movieInfo}>
              <Box>
                <img
                  className={classes.movieDetailPoster}
                  src={movieImage}
                  alt="poster"
                />
                <Box>
                  <Box>
                    <Button className={classes.addMovieButton} onClick={onClickOpenAddMovieToMovieListModal} >Add Movie To List</Button>
                  </Box>
                  <Box className={classes.movieMinorDetails}>
                    <span className={classes.movieMinorDetailTitle}>
                      Rating: {movieRatingAverage}
                    </span>
                    <span className={classes.movieMinorDetailTitle}>
                      Budget:{" "}
                      {movieBudget === 0
                        ? "N/A"
                        : `$${formatNumber(movieBudget)}`}
                    </span>
                    <span className={classes.movieMinorDetailTitle}>
                      Revenue:{" "}
                      {movieRevenue === 0
                        ? "N/A"
                        : `$${formatNumber(movieRevenue)}`}
                    </span>
                  </Box>
                  <h4 className={classes.movieDetailSectionTitle}>Storyline</h4>
                  <span className={classes.movieDescription}>
                    {movieDescription}
                  </span>
                </Box>
              </Box>
              <Box className={classes.similarMovieContainer}>
                <h4 className={classes.movieDetailSectionTitle}>
                  Similar Movies
                </h4>
                <Box className={classes.similarMovieContent}>
                  {similarMovies.length > 0 ? (
                    similarMovies.map(similarMovie => {
                      return (
                        <MovieCard
                          key={similarMovie.movieId}
                          onClickCloseAddMovieToMovieListModal={
                            onClickCloseAddMovieToMovieListModal
                          }
                          onClickOpenAddMovieToMovieListModal={
                            onClickOpenAddMovieToMovieListModal
                          }
                          onClickAddMovieToMovieList={
                            onClickAddMovieToMovieList
                          }
                          displayToolTip={
                            similarMovie.movieId === movieId ? true : false
                          }
                          onHoverDisplayToolTip={onHoverDisplayToolTip}
                          movie={similarMovie}
                        />
                      );
                    })
                  ) : (
                    <span className={classes.similarMoviesNotFoundMessage}>
                      We couldn't find any similar movies
                    </span>
                  )}
                </Box>
              </Box>
            </Box>

            <Box className={classes.movieTrailers}>
              <h4 className={classes.movieDetailSectionTitle}>Trailers</h4>
              <Box className={classes.movieTrailerVideos} >
                {videos.map(video => {
                  return (
                    <YouTube
                      key={video.key}
                      videoId={video.key}
                      opts={{
                        height: "200px",
                        width: "350px",
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
}

const MovieDetailWithRouter = withRouter(MovieDetail);

export default MovieDetailWithRouter;