import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Components/Dashboard';
import Categories from './Components/Categories';
import Instructions from './Components/Instructions';
import TestPage from './Components/Testpage';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App=()=>{
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <ProtectedRoute path="/dashboard" exact component={Dashboard}/>
        <Route path="/dashboard/categories" component={Categories} />
        <Route path="/test/:category" exact component={Instructions} />
        <Route path="/test/:category/:testId" exact component={TestPage}/>
      </Switch>
    </Router>
  )
}

export default App;
