import React from 'react';
import api from '../services/api';

function Poster(){
  return(<></>);
}

function Home(props){
  const [profile, setProfile] = React.useState({login: '', posts: []});
  
  function getProfile(setter){
    api.get('/', { headers: {
      authorization: 'Bearer '+props.token
    } }).then( data => {
      console.log(data.data.user);
      return setter(data.data.user);
    });
  }

  function isEqual(a, b){
    console.log('a '+a);
    return JSON.stringify(a) === JSON.stringify(b);
  };

  React.useEffect(() => {
    getProfile(setProfile);
    console.log(profile);
  }, []);
  
  return(
    <div className="Content-box">
      <Poster />
      <h1>{
        isEqual(profile.posts, [])? (
          <p>none</p>
        ) : (
          profile.posts.map(post => (<p>{post._id}</p>))
        )
      }</h1>
    </div>
  );
};

export default Home;
