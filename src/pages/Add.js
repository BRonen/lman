import React from 'react';
import axios from 'axios';

class Main extends React.Component{
    state = {
        nick: '',
        name: '',
        password: '',
        doing: false
    };
    
    methods = {
        register: async ({nick, name, password}) => {
            if(nick){
                return axios
                 .post('https://apilman.herokuapp.com/users', {
					"name": name,
					"password": password
				}, { headers: {'login': nick} })
                 .then(
                    () => ("done"),
                    () => ("fail")
                );
            }else{
                return ({});
            }
        },
        
        reload: () => {
            this.setState({
                nick: '',
                name: '',
                password: '',
                doing: false
            });
        },

        registerHandler: () => {
            this.methods.register(this.state)
             .then((response) => {
		this.setState({doing: response});
                console.log(response);
             });
        },

        keyPressed: (event) => {
            if (event.key === "Enter") {
                this.methods.registerHandler(this.state);
            }
        },

        loginChangeHandle: (event) => {
            this.setState({
                nick: event.target.value
            });
        },

        nameChangeHandle: (event) => {
            this.setState({
                name: event.target.value
            });
        },

        passwordChangeHandle: (event) => {
            this.setState({
                password: event.target.value
            });
        }
    };
    
    render(){
        return(
			<div className="Content-box">
			{this.state.doing? (<>
				<h1> {this.state.doing} </h1>
				<button className="Big-button"
                 onClick={this.methods.reload}> Add other </button>
			</>) : (<>
				<h1 style={{color: "#51bb57"}}>
					Register
				</h1>

				<input type="text" className="Search-input"
				 placeholder="Login" size="75"
				 onChange={this.methods.loginChangeHandle}
				 onKeyPress={this.methods.keyPressed}/> <br />
				 
				<input type="text" className="Search-input"
				 placeholder="Name" size="75"
				 onChange={this.methods.nameChangeHandle}
				 onKeyPress={this.methods.keyPressed}/> <br />
				 
				<input type="text" className="Search-input"
				 placeholder="Password" size="75"
				 onChange={this.methods.passwordChangeHandle}
				 onKeyPress={this.methods.keyPressed}/> <br />

				<button className="Big-button"
				 onClick={this.methods.registerHandler}>
					Done
				</button>
			</>)}</div>
        );
    }
}

export default Main;
