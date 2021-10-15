import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Contact from './components/Contact'
import Login from './components/Login'
import SignUp from './components/SignUp'
import About from './components/About'
import {Route,  Switch} from 'react-router-dom';
import ErrorPage from './components/ErrorPage'
import Logout from './components/Logout';
import AllUsers from './components/AllUsers';

function App() {
  return (
    <>
    <Navbar/>

    
    <Switch>

      <Route exact path="/" component={Home}/> 
    
      <Route path="/login" component={Login}/>
       
      <Route path="/signup" component={SignUp}/>
    
      <Route path="/allUsers" component={AllUsers}/>
      
      <Route path="/about" component={About}/>

      <Route path="/logout" component={Logout}/>
    
      <Route component={ErrorPage}/>
    
    </Switch>

   </>
  )
}

export default App;
