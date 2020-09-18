import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const SearchButton = ({ cityList, onclickHandler }) => (
    <IconButton
        color="primary"
        size="medium"
        onClick={() => {
            if (cityList.length > 0) {
                onclickHandler(cityList[0].id);
            }
        }}>
        <SearchIcon />
    </IconButton>
)

export default SearchButton;