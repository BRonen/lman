import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../services/api';

function Login(props) {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const [status, setStatus] = useState('Unauth');

	function logger (){
		api.post('/auth',{
			'login': 'admin', 'password': 'admin'
		}).then(({data}) => {
			console.log(data);
			props.setToken('Magic '+data.token);
		}).catch(err => {
			setStatus(err.response.data);
		});
	};
	
	useEffect(logger, []);

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
				<p>{status === 'Unauth'? '' : status}</p>
			</>)}
		</div>
	);
}

export default Login;
