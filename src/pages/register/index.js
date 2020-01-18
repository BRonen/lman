import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../services/api';

function Register(props) {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const [status, setStatus] = useState('Unauth');
	
	function register (){
		api.post('/',{
			'login': login, 'password': pass
		}).then(data => {
			props.setToken(data.data.token);
		}).catch(err => {
			setStatus(err.response.data);
		});
	};
	
	return (
		<div className="menu">
			{props.token? (
				<Redirect to={{pathname: '/', state: {from: props.location} }}/>
			) : (<>
				<h1>Register</h1>
				<input type="text" placeholder="Login:" onChange={
				 e => setLogin(e.target.value)}/>
				<input type="text" placeholder="Password:" onChange={
				 e => setPass(e.target.value)}/>
				<div className="Buttons">
				<button onClick={register}>
					enter
        </button>
				<Link to="/login">
					<button>login</button>
				</Link>
				</div>
				<p>{(status === 'Unauth')? '' : status}</p>
			</>)}
		</div>
	);
}

export default Register;
