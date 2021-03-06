import React, { createContext, useContext, useEffect, useReducer } from 'react'
import NavBar from './components/Navbar';
import "./App.css";
import { BrowserRouter, Route,Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/useReducer';
import UserProfile from './components/screens/UserProfile';
import SubsribesUserPosts from './components/screens/SubscribesUserPosts';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
      // history.push('/')
    } else {
      history.push('/signin')
    }
  }, [])

  return(
    <Switch>
    <Route exact path="/">
    <Home />
  </Route>
  <Route path="/signin">
    <Login />
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route exact path="/profile">
    <Profile />
  </Route>
  <Route path="/create">
    <CreatePost />
  </Route>
  <Route path="/profile/:userid">
    <UserProfile />
  </Route>
  <Route path="/myfollowingpost">
    <SubsribesUserPosts />
  </Route>
  </Switch>
  );
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state:state, dispatch:dispatch}}>
    <BrowserRouter>
        <NavBar />
         <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
