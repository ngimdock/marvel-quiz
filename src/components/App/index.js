import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from '../Header/';
import Landing from '../Landing/';
import Footer from '../Footer/';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from "../Signup";
import ErrorPage from '../ErrorPage';

import '../../App.css';

function App() {
  return (

    <Router>

      <Header />

      <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>

          <Route path="/welcome">
            <Welcome />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Router path="/signup" >
            <Signup />
          </Router>

          <Route>
            <ErrorPage />
          </Route>
      </Switch>

      <Footer />

    </Router>
  );
}


function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}


export default App;
