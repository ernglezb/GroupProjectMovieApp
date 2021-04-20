import {Link} from 'react-router-dom';
import {Box, Button} from '@material-ui/core';

const Nav = function(){


    return (
        <Box>
            <Button>
                <Link to="/register" >Register</Link>
            </Button>
            <Button>
                <Link to="login" >Login</Link>
            </Button>
        </Box>
    )
}

export default Nav;