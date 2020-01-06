import React from 'react';
import api from '../services/api';

function Header(){
  const [profile, setProfile] = React.useState('');

  function searchProfile(){
    api.get('/user/'+profile).then(({data}) => {
      setProfile(data);
    });
  }

  return(<div className="Content-box Menu">
    <textarea className="Text-input" placeholder="search"></textarea>
    <button className="Menu-button" onClick={searchProfile}>search</button>
  </div>);
}

export default Header;
