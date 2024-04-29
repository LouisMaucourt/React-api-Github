import React, { useState, useEffect } from 'react';

const SelectedUserInfo = ({ user }) => {
    const [repos, setRepos] = useState([]);
    const [showRepos, setShowRepos] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRepos = async () => {
        if (!user || !user.login) return;

        setIsLoading(true);
        const response = await fetch(`https://api.github.com/users/${user.login}/repos`);
        const data = await response.json();
        setRepos(data);
        setIsLoading(false);
    };

    const toggleRepos = () => {
        setShowRepos(!showRepos);
        if (!showRepos && repos.length === 0) {
            fetchRepos();
        }
    };

    return (
        <div class="info_user">
            <h2>Informations sur l'utilisateur sélectionné</h2>
            <p>Nom d'utilisateur: {user.login}</p>
            <img class="img-user" src={user.avatar_url} alt="Profile" />
            <p>URL du profil: <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.html_url}</a></p>
            <p>Bio: {user.bio}</p>
            <p>Blog: {user.blog}</p>
            <p>Email: {user.email}</p>
            <button onClick={toggleRepos}>Découvrir les repos de {user.login}</button>
            {isLoading ? (
                <p>Chargement des données...</p>
            ) : (
                showRepos && (
                    <>
                        <h3>Liste des référentiels :</h3>
                        <ul>
                            {repos.map(repo => (
                                <li key={repo.id}>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                    <p>{repo.description}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )
            )}
        </div>
    );
}

export default SelectedUserInfo;
