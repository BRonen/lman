import React, {useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

function PrivateRoute ({...props}){
  
	return (
		<Route {...props} component={() => (
			props.token ? ( <>
        <h1>hello world</h1>
      </>) : (
				<Redirect to={{pathname: '/login', state: {from: props.location} }}/>
			)
		)} />
	);
}

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
