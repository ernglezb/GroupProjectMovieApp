import {useEffect} from 'react';
import {Box, makeStyles, Grid} from '@material-ui/core';
import ListsCard from './ListsCard';

const useStyles = makeStyles(() => ({
  accountMovieListsRoot: {
    width: "90%",
    margin: '0 auto'
  },
  listCardContainer: {
    display: "flex",
    flexDirection: "column",
  },
  accountSubtitles: {
    color: "rgb(230,191,27)",
    width: 'fit-content'
  },
  listCardItems: {
    display: "flex",
    flexWrap: 'wrap'
  }
}));

const AccountMovieLists = function(props){

    const classes = useStyles();

    const {
      lists,
      loading,
      onClickOpenMovieListModal,
      onClickOpenDeleteMovieListModal
    } = props;
    

    return (
      <Box className={classes.accountMovieListsRoot}>
        <Box className={classes.listCardContainer}>
          <h2 className={classes.accountSubtitles} >Your Movie Lists</h2>
          <Box className={classes.listCardItems}>
            {lists.map((list, id) => {
              return (
                <ListsCard
                  key={list.listId}
                  onClickOpenDeleteMovieListModal={onClickOpenDeleteMovieListModal}
                  onClickOpenMovieListModal={onClickOpenMovieListModal}
                  list={list}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    );
}

export default AccountMovieLists;