import {Box, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
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
  movieListFormTitle: {
    fontFamily: "Montserrat, sans-serif",

  },
  movieListCreateInput: {
    width: "100%",
    fontFamily: "Montserrat, sans-serif"
  },
  movieListCreateButton: {
    marginTop: "30px",
    background: "rgb(230,191,27)"
  },
  alertMessage: {
    width: '100%'
  }
}));


const MovieListForm = function(props){

    const {onChange, onSubmit, error, errorMessage} = props;
    const classes = useStyles();

    return (
      <Box className={classes.movieListFormRoot}>
        <h2 className={classes.movieListFormTitle}>Create a new list</h2>
        {error && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={onSubmit} className={classes.movieListForm}>
          <TextField
            onChange={onChange}
            label="Name"
            required
            className={classes.movieListInput}
            name="listName"
            placeholder="Name"
          />
          <TextField
            onChange={onChange}
            label="Description"
            required
            className={classes.movieListInput}
            name="listDescription"
            placeholder="Description"
          />

          <Button className={classes.movieListCreateButton} type="submit">
            Create List
          </Button>
        </form>
      </Box>
    );
}

export default MovieListForm;