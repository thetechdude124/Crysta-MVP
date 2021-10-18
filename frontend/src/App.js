import './index.css';
import SideMenu from './components/SideMenu';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';
import Energy from './pages/Energy';
import Logout from './Logout';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    const dataObject = {
        username: user.name
    };
    axios.post('http://0.0.0.0:5000/user', dataObject)
        .then((res) => {
      console.log(res.data)
      }).catch(error => {
      console.log(error)
      });
    axios.post('http://0.0.0.0:3001/send-user', dataObject)
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

          <Route path='/pages/Calendar' component={Calendar}/>
          <Route path='/pages/Tasks' component={Tasks}/>
          <Route path='/pages/Energy' component={Energy}/>
          <Route path='/pages/Logout'  component={Logout}/>
          
        </Switch>
      </Router>
    
  );
}

export default App;