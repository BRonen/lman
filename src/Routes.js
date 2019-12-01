import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Add from './pages/Add';
import List from './pages/List';
import Delete from './pages/Delete';
import Update from './pages/Update';

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
				<Route path="/delete" exact component={Delete}/>
				<Route path="/update" exact component={Update}/>
				<Route path="/" component={Home}/>
			</Switch>
		</BrowserRouter>
	);
}
