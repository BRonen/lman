import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import './home.css';

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
    api.post('/posts', {title: title, content: 'http://'+url}, {
      headers: {authorization: props.token}
    }).then(links => {
      props.load(true);
      return links;
    });
  }
  
  return(<div className="Linker">
    <input placeholder="Title:" onChange={titleHandler} />
    <input placeholder="Url:" onChange={urlHandler} />
    <button onClick={sendPost}>Send</button>
  </div>);
}


function Links(props){

  function deleteLink(ref){
    api.delete('/posts', {
      data: {linkId: ref},
      headers: {authorization: props.token}
    }).then( data => {
      props.load(true);
    }).catch( err => {
      console.log({err});
    });
  }
  
  function LinkTemplate(props){
    return(
      <div key={props._id} className="Menu Content-box Grid">
        <a href={props.content}>
          <button>{props.title}</button>
        </a>
        <button onClick={()=>{deleteLink(props._id);}}>delete</button>
      </div>
    )
  }
  
  function LinkList(props){
    return(
      props.state.profile.links.length === 0? (
        <h1>none</h1>
      ) : (
        props.state.profile.links.reverse().map(link => (
          <LinkTemplate {...link} />
        ))
      )
    )
  }

  return(
    <div className="Links">
      {
        props.state.loading? (<>loading...</>) : (
          <LinkList {...props} />
        )
      }
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

  return(<>
    <div className="Home">
      <Linker load={setLoading} token={props.token}/>
      <Links token={props.token} state={{loading, profile}} load={setLoading}/>
    </div>
  </>);
}

export default Home;
