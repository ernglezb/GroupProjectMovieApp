import {Box, Fade} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import ReactPlayer from 'react-player'

const useStyles = makeStyles(() => ({
    clapperRoot: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0'
    },
}));

const Clapper = function(props){

    const {isLoading} = props;
    const classes = useStyles();


    return (
    <Fade in={isLoading}>
      <ReactPlayer
        muted={true}
        style={{
          zIndex: "20",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          display: isLoading ? 'block' : 'none'
        }}
        width=""
        height=""
        autoPlay={true}
        playing={true}
        url="./videos/clapper.mp4"
      />
      </Fade>
    );

}

export default Clapper;