import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const CitySuggestion = ({ cityData, onClickHandler }) => {
    const { id, name } = cityData;
    return (
        <>
            <ListItem button onClick={() => onClickHandler(id)}>
                <ListItemText
                    primary={name}
                    secondary={'City Id: ' + id}
                />
            </ListItem>
            <Divider />
        </>
    )
}

export default CitySuggestion;