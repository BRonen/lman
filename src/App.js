import React, {useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';

import './App.css';

const PrivateRoute = ({...props}) => (
  <Route {...props} component={() => (
    props.token ? ( <>
      <Home token={props.token} />
    </>) : (
      <Redirect to={{pathname: '/login', state: {from: props.location} }}/>
    )
  )} />
);

export default function App(){
  const [token, setToken] = useState('');

	return(
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" setToken={setToken} token={token}/>
      <Route exact path="/login">
        <Login setToken={setToken} token={token} />
      </Route>
      <Route exact path="/register">
        <Register setToken={setToken} token={token} />
      </Route>
    </Switch>
  </BrowserRouter>);
}
