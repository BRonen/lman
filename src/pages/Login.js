import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../services/api';

function Login(props) {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');

	function logger (){
		api.post('/auth',{
			'login': login, 'password': pass
		}).then(data => {
			console.log(data);
			props.setToken('Bearer '+data.data.token);
		});
	};

	return (
		<div className="Content-box">
			{props.token? (
				<Redirect to={{pathname: '/', state: {from: props.location} }}/>
			) : (<>
				<h1>To-do: melhorar layout</h1><br />
				<input type="text" placeholder="Login:" onChange={
				 e => setLogin(e.target.value)}/>
				<input type="text" placeholder="Password:" onChange={
				 e => setPass(e.target.value)}/>
				<button className="Big-button" onClick={logger}>
					enter
				</button>
				<Link to="/register">
					<button className="Big-button">register</button>
				</Link>
			</>)}
		</div>
	);
}

export default Login;
