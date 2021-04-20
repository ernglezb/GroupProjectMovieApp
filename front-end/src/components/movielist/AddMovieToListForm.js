import { Box, TextField, Button, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  movieListFormRoot: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  movieListForm: {
    display: "flex",
    flexDirection: "column",
    height: "40%",
    justifyContent: "space-around",
    position: "absolute",
    top: "50%",
    bottom: "0",
    width: "90%",
    margin: "0 auto"
  },
  movieListFormTitle: {
    fontFamily: "Montserrat, sans-serif"
  },
  movieLsitFormHelperText: {
    fontFamily: "Montserrat, sans-serif"
  },
  movieListAddInput: {
    width: "100%"
  },
  movieListAddButton: {
    marginTop: "10px",
    background: "rgb(230,191,27)"
  },
  noMovieListCloseButton: {
    backgroundColor: "rgb(230,191,27)",
    marginTop: "50px"
  }
}));

const AddMovieToListForm = function(props) {
  const { onChange, onSubmit, userLists, listNameSelected, onClickCloseAddMovieToMovieListModal } = props;
  const classes = useStyles();


  if(userLists.length == 0){
    return (
      <Box className={classes.movieListFormRoot}>
        <h2 className={classes.movieListFormTitle} >You don't have any lists created</h2>
        <p className={classes.movieLsitFormHelperText} >Please create a list to add this movie</p>
        <Button type="text" variant="outlined" className={classes.noMovieListCloseButton} onClick={(e) => onClickCloseAddMovieToMovieListModal(e)}>Close</Button>
      </Box>
    );
  }


  return (
    <Box className={classes.movieListFormRoot}>
      <form onSubmit={onSubmit} className={classes.movieListForm}>
        <Select
          onChange={onChange}
          value={listNameSelected}
        >
          {userLists.map(list => {
            return (
              <MenuItem key={list.listId} value={list.listName}>
                {list.listName}
              </MenuItem>
            );
          })}
        </Select>

        <Button className={classes.movieListAddButton} type="submit">
          Add Movie
        </Button>
      </form>
    </Box>
  );
};

export default AddMovieToListForm;
