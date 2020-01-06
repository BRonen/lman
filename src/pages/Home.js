import React, {useState, useEffect} from 'react';
import api from '../services/api';

function Poster(props){
  const [post, setPost] = useState('');
  
  function postHandler(e){
    setPost(e.target.value);
  }
  
  function sendPost(){
    console.log(api.post('/posts', {content: post}, {
      headers: {authorization: props.token}
    }).then(posts => {
      props.load(true);
      return posts;
    })
    );
  }
  
  return(<div className="Content-box">
    <textarea className="Text-input" placeholder="How are you?" onChange={postHandler}></textarea>
    <button className="Big-button" onClick={sendPost}>send</button>
  </div>);
}

function Posts(props){
  return(
    <div className="Content-box">
      <h1>{
        props.state.loading? (<>loading...</>) : (
          props.state.profile.posts.length === 0? (
            <p>none</p>
          ) : (
            props.state.profile.posts.reverse().map(post => (<p key={post._id}>{post.content}</p>))
          )
        )
      }</h1>
    </div>
  );
};

function Home(props){
  const [profile, setProfile] = useState({posts: []});
  const [loading, setLoading] = useState(true);
  
  function updateProfile(){
    console.log(props)
    api.get('/', { headers: {
      authorization: props.token
    } }).then( data => {
      setProfile(data.data.user);
      setLoading(false);
      return data.data.user;
    });
  }
  
  useEffect(updateProfile, []);
  useEffect(updateProfile, [loading]);

  return(<div className="Content-box">
    <Poster load={setLoading} token={props.token}/>
    <Posts state={{loading, profile}} token={props.token}/>
  </div>);
}

export default Home;
