import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton = ({ citySuggestion, onclickHandler }) => (
    <IconButton
        size="medium"
        onClick={() => {
            if (citySuggestion.length > 0) {
                onclickHandler(citySuggestion[0].id);
            }
        }}>
        <SearchIcon />
    </IconButton>
)

export default SearchButton;