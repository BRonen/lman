import React, {useState, useEffect} from 'react';
import api from '../services/api';

function Linker(props){
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  
  function urlHandler(e){
    setUrl(e.target.value);
  }
  
  function titleHandler(e){
    setTitle(e.target.value);
  }
  
  function sendPost(){
    api.post('/posts', {title: title, content: url}, {
      headers: {authorization: props.token}
    }).then(links => {
      props.load(true);
      return links;
    });
  }
  
  return(<div className="Content-box">
    <input className="Text-input" placeholder="Title:" onChange={titleHandler} />
    <input className="Text-input" placeholder="Url:" onChange={urlHandler} />
    <button className="Big-button" onClick={sendPost}>send</button>
  </div>);
}


function Links(props){

  function deleteLink(ref){
    console.log(props);
    api.delete('/posts', {
      data: {linkId: ref},
      headers: {authorization: props.token}
    }).then( data => {
      props.load(true);
    }).catch( err => {
      console.log({err});
    });
  }

  return(
    <div className="Content-box">
      <h1>{
        props.state.loading? (<>loading...</>) : (
          props.state.profile.links.length === 0? (
            <p>none</p>
          ) : (
          props.state.profile.links.reverse().map(link => (
            <div key={link._id} className="Menu Content-box">
              <a href={link.content}>
                <button className="Menu-button">{link.title}</button>
              </a>
              <button className="Menu-button" onClick={() => deleteLink(link._id)}>x</button>
            </div>))
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
            console.log(data.data);
      setLoading(false);
      return data.data.user;

    });
  }
  
  useEffect(updateProfile, []);
  useEffect(updateProfile, [loading]);

  return(<div className="Content-box">
    <Linker load={setLoading} token={props.token}/>
    <Links token={props.token} state={{loading, profile}} load={setLoading}/>
  </div>);
}

export default Home;
//