import {makeStyles} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import MovieDetail from './components/movie/MovieDetail';
import Nav from './components/nav/Nav';
import Account from './components/user/Account';

const useStyles = makeStyles((theme) => ({
  appRoot: {
    height: '100%',
    width: '100%',
    position: 'relative'
  }
}))

function App() {

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.appRoot}>
        <Switch>
          <Route component={Landing} exact path="/" />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={MovieDetail} exact path="/movie/:movie_name-:movie_id" />
          <Route component={Dashboard} exact path="/dashboard" />
          <Route component={Account} path="/account" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
