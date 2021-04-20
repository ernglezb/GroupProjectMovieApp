import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  toolTip: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '35px',
      height: '20px',
      display: 'none'
  },
  displayToolTip: {
    display: 'flex'
  },
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));


const MovieAddToolTip = function(props){

    const classes = useStyles();
    const { displayToolTip, onClickOpenAddMovieToMovieListModal } = props;

    return (
      <Tooltip
        onClick={onClickOpenAddMovieToMovieListModal}
        className={clsx(classes.toolTip, {
          [classes.displayToolTip]: displayToolTip
        })}
        title="Add Movie"
        aria-label="Add Movie"
      >
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
    );
}

export default MovieAddToolTip;