import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const CitySuggestion = ({ cityData, onClickHandler }) => {
    const { id, name } = cityData;
    return (
        <>
            <ListItem button onClick={() => onClickHandler(id)}>
                <span>{name}</span>
                <span>{id}</span>
            </ListItem>
            <Divider />
        </>
    )
}

export default CitySuggestion;