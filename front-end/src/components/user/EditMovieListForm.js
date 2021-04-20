import { Box, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";


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
    width: "90%",
    margin: "0 auto"
  },
  movieListCreateInput: {
    width: "100%"
  },
  movieListCreateButton: {
    marginTop: "10px",
    background: "rgb(230,191,27)"
  }
}));

const EditMovieListForm = function(props) {
  const {listToEdit , onChange, onSubmit, error, errorMessage} = props;
  const classes = useStyles();

  const {listId, listName, listDescription} = listToEdit;

  return (
    <Box className={classes.movieListFormRoot}>
      <h2>Edit {listName}</h2>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={onSubmit} className={classes.movieListForm}>
        <TextField
          label="List Name"
          onChange={onChange}
          required
          className={classes.movieListInput}
          name="listName"
          placeholder="Name"
        />
        <TextField
          label="List Description"
          onChange={onChange}
          required
          className={classes.movieListInput}
          name="listDescription"
          placeholder="Description"
        />

        <Button className={classes.movieListCreateButton} type="submit">
          Edit List
        </Button>
      </form>
    </Box>
  );
};

export default EditMovieListForm;
