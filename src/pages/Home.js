import React from 'react';
import api from '../services/api';

function Poster(){
  return(<></>);
}

class Home extends React.Component{
  constructor(props){
    super();
    this.state = {
      profile: {posts: []},
      loaded: false
    }
  }
  
  setProfile = (setter) => {
    api.get('/', { headers: {
      authorization: 'Bearer '+this.props.token
    } }).then( data => {
      this.setState({profile: data.data.user});
      this.setState({loaded: true});
      return data.data.user;
    });
  }
  
  componentDidMount(){
    this.setProfile();
  }
  
  render(){
    return(
      <div className="Content-box">
        <Poster />
        <h1>{
          this.state.profile.posts.length === 0? (
            <p>none</p>
          ) : (
            this.state.profile.posts.map(post => (<p>{post._id}</p>))
          )
        }</h1>
      </div>
    );
  }
};

export default Home;
