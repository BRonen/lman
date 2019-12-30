import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../services/api';

function Register(props) {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	
	function register (login, password){
		api.post('/',{
			'login': login, 'password': password
		}).then((data) => {
			props.setToken(data.data.token);
		});
	};
	
	return (
		<div className="Content-box">
			{props.token? (
				<Redirect to={{pathname: '/', state: {from: props.location} }}/>
			) : (<>
				<input type="text" placeholder="Login:" onChange={
				 e => setLogin(e.target.value)}/>
				<input type="text" placeholder="Password:" onChange={
				 e => setPass(e.target.value)}/>
				<button className="Big-button" onClick={
						() => register(login, pass)
				}>enter</button>
				<Link to="/login">
					<button className="Big-button">login</button>
				</Link>
			</>)}
		</div>
	);
}

export default Register;
