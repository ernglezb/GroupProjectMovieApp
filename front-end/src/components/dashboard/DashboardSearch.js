import {makeStyles, Box, Button, TextField, Modal, IconButton, } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import {withRouter} from 'react-router';


const useStyles = makeStyles(() => ({
  dashboardSearchRoot: {
    position: "absolute",
    top: "5%",
    bottom: "0",
    left: "0",
    right: "0",
    width: "90%",
    height: "90%",
    margin: "0 auto",
    opacity: "0.8",
    backgroundColor: "#131b21",
    padding: "10px",
    overflow: 'scroll'
  },
  searchHeader: {
      display: 'flex',
      width: 'fit-content'
  },
  searchTitle: {
    color: "white",
    fontFamily: "Montserrat, sans-serif"
  },
  searchInputContainer: {
    width: "100%"
  },
  searchInput: {
    fontSize: "4em",
    width: "100%",
    color: "white",
    fontWeight: "700",
    fontFamily: "Montserrat, sans-serif"
  },
  searchInputRoot: {
    width: "100%"
  },
  resultContainer: {
    marginTop: '10px',
  },
  resultSearch: {
    color: "white",
    fontSize: "2em",
    display: "inline-block",
    fontFamily: "Montserrat, sans-serif",
    cursor: 'pointer'
  }
}));

const DashboardSearch = function(props){

    const classes = useStyles();

    const {
      onClickCloseSearchModal,
      onClickOpenSearchModal,
      onChangeTriggerSearch,
      toggleSearchModal,
      results
    } = props;

    const onClickGoToMovieDetail = function(movie){
        props.history.push({
            pathname: `/movie/${movie.title}-${movie.id}`,
            state: {
              movieId: movie.id
            }
        });
        onClickCloseSearchModal();
    }

    return (
      <Modal open={toggleSearchModal} onClose={onClickCloseSearchModal}>
        <Box className={classes.dashboardSearchRoot}>
          <Box className={classes.searchHeader}>
            <h2 className={classes.searchTitle}>Search</h2>
            <IconButton aria-label="close" size="small" className={classes.searchTitle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={classes.searchInputContainer}>
            <TextField
              classes={{
                root: classes.searchInputRoot
              }}
              autoFocus={true}
              onChange={onChangeTriggerSearch}
              margin="dense"
              autoComplete={false}
              name="search"
              InputProps={{ className: classes.searchInput }}
            />
          </Box>
          <Box>
            {results && results.map(result => {
              return (
                <Box onClick={(() => onClickGoToMovieDetail(result))} className={classes.resultContainer} key={result.id}>
                  <span className={classes.resultSearch}>{result.title}</span>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Modal>
    );
}
const DashboardSearchWithRouter = withRouter(DashboardSearch)
export default DashboardSearchWithRouter;