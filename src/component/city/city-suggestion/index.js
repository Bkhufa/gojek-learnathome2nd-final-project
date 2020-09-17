import React from 'react';

const CitySuggestion = ({ cityData }) => {
    const { id, name } = cityData;
    return (
        <div>
            <span>{name}</span>
            <span>{id}</span>
        </div>
    )
}

export default CitySuggestion;