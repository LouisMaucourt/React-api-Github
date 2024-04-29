import React, { useState } from 'react';
import './App.css';
import Input from './components/form/Input';
import Submit from './components/form/Submit';
import ListResults from './components/uxgit/ListResults';
import SelectedUserInfo from './components/uxgit/SelectedUserInfo';

function App() {
  const [userName, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const handleSearch = () => {
    if (userName) {
      setIsLoading(true);
      fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }

  const handleSelect = (user) => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/${user.login}`)
      .then(response => response.json())
      .then(data => {
        setSelectedUser(data);
        fetch(`https://api.github.com/users/${user.login}/repos`)
          .then(response => response.json())
          .then(repos => {
            setSelectedUser(prevUser => ({ ...prevUser, repos: repos }));
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching user repositories:', error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setIsLoading(false);
      });
  }

  return (
    <div className="App">
      <Input placeholder='Pseudo Github' value={userName} onChange={handleChange} />
      <Submit onClick={handleSearch}>Recherche</Submit>
      {isLoading ? (
        <div>Chargement...</div>
      ) : (
        <ListResults onSelect={handleSelect} searchResults={searchResults} />
      )}
      {!isLoading && selectedUser && <SelectedUserInfo user={selectedUser} />}
    </div>
  );
}

export default App;
