import './index.css';
import SideMenu from './components/SideMenu';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import Logout from './Logout';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    const usernameObject = {
        username: user.name
    };
    axios.post('http://127.0.0.1:5000/user', usernameObject)
        .then((res) => {
      console.log(res.data)
      }).catch(error => {
      console.log(error)
      });
  }

  return (
      <Router>
          <Route path='/' exact component={Login}/>
          <Route path= '/Login' component={Login}/>
          <SideMenu/>
          <Switch>

            <Route path='/pages/Dashboard' component={Dashboard}/>
            <Route path='/pages/Tasks' component={Tasks}/>
            <Route path='/pages/Calendar' component={Calendar}/>
            <Route path='/pages/Logout'  component={Logout}/>
            
          </Switch>
      </Router>
    
  );
}

export default App;