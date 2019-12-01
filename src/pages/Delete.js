import React from 'react';
import api from '../services/api';

class Main extends React.Component{
    state = {
    	nick: '',
        doing: false
    };
    
    methods = {
        register: async (login) => {
            if(login){
                return api
                 .delete('/users', {headers: { "login": login }})
                  .then(
                    () => ("done"),
                    () => ("fail")
                 );
            }else{
            	console.log('a');
            }
        },
        
        reload: () => {
            this.setState({
                doing: false
            });
        },

        registerHandler: () => {
            this.methods.register(this.state.nick)
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
        }
    }
       
    render(){
        return(
			<div className="Content-box">
			{this.state.doing? (<>
				<h1> {this.state.doing} </h1>
				<button className="Big-button"
                 onClick={this.methods.reload}> Add other </button>
			</>) : (<>
				<h1 style={{color: "#51bb57"}}>
					Delete
				</h1>

				<input type="text" className="Search-input"
				 placeholder="Login" size="75"
				 onChange={this.methods.loginChangeHandle}
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

    