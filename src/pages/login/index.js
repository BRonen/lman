import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';

function Login(props) {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const [status, setStatus] = useState('Unauth');

	function logger (){
		api.post('/auth',{
			'login': login, 'password': pass
		}).then(({data}) => {
			console.log(data);
			props.setToken('Magic '+data.token);
		}).catch(err => {
			setStatus(err.response.data);
		});
	};
	
	function loggera (){
		api.post('/auth',{
			'login': "admin", 'password': "admin"
		}).then(({data}) => {
			console.log(data);
			props.setToken('Magic '+data.token);
		}).catch(err => {
			setStatus(err.response.data);
		});
	};

	React.useEffect(loggera, []);

	return (
		<div className="menu">
			{props.token? (
				<Redirect to={{pathname: '/', state: {from: props.location} }}/>
			) : (<>
				<h1>Login</h1>
				<input type="text" placeholder="Login:" onChange={
				 e => setLogin(e.target.value)}/>
				<input type="password" placeholder="Password:" onChange={
				 e => setPass(e.target.value)}/>
				<div className="Buttons">
				<button onClick={logger}>
					enter
				</button>
				<Link to="/register">
					<button>register</button>
				</Link>
				</div>
				<p>{(status === 'Unauth')? '' : status}</p>
			</>)}
		</div>
	);
}

export default Login;
