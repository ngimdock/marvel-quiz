import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { IconContext } from "react-icons"; // le context des icones 

import Header from '../Header/';
import Landing from '../Landing/';
import Footer from '../Footer/';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from "../Signup";
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';

import '../../App.css';

function App() {
  return (

    <Router>

      <IconContext.Provider value={{ className: "react-icons", style: {verticalAlign: "middle" } }}> {/* context provider for icons */}
        <Header />

        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgetpassword" component={ForgetPassword} />

            <Route component={ErrorPage} />
        </Switch>

        <Footer />
      </IconContext.Provider>

    </Router>
  );
}


export default App;
