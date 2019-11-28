import React from 'react';
import axios from 'axios';
import Search from './search/';

class Main extends React.Component{
    state = {
        searchs: {data: '', loading: false}
    };
    methodsUser = {
        search: async (nickname) => {
            if(nickname){
                return axios
                .get('https://apilman.herokuapp.com/users', { headers: {'login': nickname} })
                .then(
                    (response) => (response.data),
                    () => ({login: "invalid github"})
                );
            }else{
                return ({});
            }
        },

        searchHandler: () => {
            this.methodsUser.search(this.state.search)
            .then((response) => {
                console.log(response)
                if(response){
                    this.setState({
                        searchs: {
                            data: response, loading: true
                        }
                    });
                }
            });
            
        },

        keyPressed: (event) => {
            if (event.key === "Enter") {
                this.methodsUser.searchHandler(this.state.search);
            }
        },

        searchChangeHandle: (event) => {
            this.setState({
                search: event.target.value
            });
        }
    };
    
    render(){
        return(
            <>
                <div className="Content-box Main">
                    <Search methods={this.methodsUser}/>
                </div>
                {this.state.searchs.loading? (
                    <div className="Content-box Main">
                        <h1>{this.state.searchs.data.login}</h1>
                        <h2>{this.state.searchs.data.name}</h2>
                        <p>
                            {this.state.searchs.data.bio? this.state.searchs.data.bio : ""}
                            {this.state.searchs.data.avatar_url? <img alt="" src={this.state.searchs.data.avatar_url}/> : ""}
                        </p>
                    </div>
                ) : <></>}
            </>
        );
    }
}

export default Main;
