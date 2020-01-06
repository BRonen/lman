import React from 'react';
import {Link} from 'react-router-dom';

function Main() {
	return (
		<div className="Content-box Menu">
			<Link to='/'><button className="Menu-button">Home</button></Link>
			<Link to='/add'><button className="Menu-button">Add</button></Link>
			<Link to='/list'><button className="Menu-button">List</button></Link>
			<Link to='/delete'><button className="Menu-button">Delete</button></Link>
			<Link to='/update'><button className="Menu-button">Update</button></Link>
		</div>
	);
}

export default Main;
