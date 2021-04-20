import {useState} from 'react';
import {makeStyles, Box, Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import DisplayMoviesInListModal from './DisplayMoviesInListModal';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({
  listCardRoot: {
    width: "250px",
    height: "250px",
    margin: "10px"
  },
  listCardContent: {
    textAlign: "center"
  },
  listCardTitle: {
    fontSize: "2em",
    fontFamily: "Montserrat, sans-serif"
  },
  listCardDescription: {
    fontSize: "1.2em",
    color: "lightgray",
    fontFamily: "Montserrat, sans-serif"
  },
  listCardButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));



const ListsCard = function(props){
    const [state, setState] = useState({toggleMoviesInListModal: false});  

    const classes = useStyles();
    const {onClickOpenMovieListModal, onClickOpenDeleteMovieListModal} = props;
    const {listName, listDescription} = props.list;

    const onClickOpenMoviesInMovieListModal = function(e) {
      e.stopPropagation();
      setState({toggleMoviesInListModal: true });
    };

    const onClickCloseMoviesInMovieListModal = function(e) {
      e.stopPropagation();
      setState({toggleMoviesInListModal: false });
    };

    const {toggleMoviesInListModal} = state;


    return (
      <Card
        onClick={onClickOpenMoviesInMovieListModal}
        className={classes.listCardRoot}
      >
        <Box className={classes.listCardButtonContainer}>
          <Tooltip
            onClick={e => onClickOpenDeleteMovieListModal(e, props.list)}
            title="Delete List"
          >
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            onClick={e => onClickOpenMovieListModal(e, props.list)}
            title="Edit List"
          >
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <CardContent className={classes.listCardContent}>
          <Typography className={classes.listCardTitle}>{listName}</Typography>
          <Typography className={classes.listCardDescription}>
            {listDescription}
          </Typography>
        </CardContent>
        <DisplayMoviesInListModal
          onClickCloseMoviesInMovieListModal={onClickCloseMoviesInMovieListModal}
          toggleMoviesInListModal={toggleMoviesInListModal}
          list={props.list}
        />
      </Card>
    );
}

export default ListsCard;