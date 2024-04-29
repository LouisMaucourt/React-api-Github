import React from 'react';

const ListResults = ({ searchResults, onSelect }) => {
    const handleClick = (user) => {
        onSelect(user);
    };

    return (
        <div>
            <h2>Résultats de la recherche :</h2>
            <ul>
                {searchResults && searchResults.items && searchResults.items.map(user => (
                    <button onClick={() => handleClick(user)} key={user.id}>{user.login}</button>
                ))}
            </ul>
        </div>
    );
}

export default ListResults;
