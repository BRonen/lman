import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Add from './pages/Add';
import List from './pages/List';
import Home from './pages/Home';
import Main from './pages/Main';

function Easter(){
	return(
		<div className="Content-box Easter">
			<h1> hello world </h1>
		</div>
	);
}

export default function Routes(){
	return(
		<BrowserRouter>
			<Main/>
			<Switch>
				<Route path="/easter" exact component={Easter}/>
				<Route path="/list" exact component={List}/>
				<Route path="/add" exact component={Add}/>
				<Route path="/" exact component={Home}/>
			</Switch>
		</BrowserRouter>
	);
}
