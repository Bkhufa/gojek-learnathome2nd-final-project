import React, { useEffect, useState } from 'react';
import { fetchRestaurant, fetchCity } from '../../utils/fetch-api';
import Card from './restaurant-card';
import CitySuggestion from './city-suggestion';

import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const App = () => {
    const [cityQuery, setCityQuery] = useState('Jakarta');
    const [cityList, setCityList] = useState([{
        id: 74,
        name: 'Jakarta'
    }]);
    const [appState, setAppState] = useState({
        loading: false,
        restaurants: null,
    });

    const restaurantStateHandle = (cityId) => {
        fetchRestaurant(cityId).then(({ data }) => {
            setAppState({ loading: false, restaurants: data.restaurants });
        });
    };

    const cityStateHandle = (cityQuery) => {
        fetchCity(cityQuery).then(({ data: { location_suggestions } }) => {
            setCityList(location_suggestions);
        });
    };

    const clickHandle = (id) => {
        console.log("click", id);
    };


    useEffect(() => {
        setAppState({ loading: true });
        restaurantStateHandle(cityList[0].id);
    }, []);

    return (
        <>
            <header>
                <h1>Go Zomato</h1>
                <div>
                    <OutlinedInput
                        id="search-city"
                        value={cityQuery}
                        type="search"
                        placeholder="Search City"
                        onChange={({ target: { value } }) => {
                            setCityQuery(value);
                            cityStateHandle(cityQuery);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    size="medium"
                                    onClick={() => {
                                        if (cityList.length > 0) {
                                            restaurantStateHandle(cityList[0].id);
                                        }
                                    }}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    <List>
                        {cityList.length === 0 ?
                            <ListItem>City Not Found</ListItem>
                            :
                            cityList.map((cities, idx) => (
                                <CitySuggestion cityData={cities} key={idx} onClickHandler={restaurantStateHandle} />
                            ))
                        }
                    </List>
                </div>
            </header>

            <main>
                <h2>Displaying restaurants in {appState.restaurants ? appState.restaurants[0].restaurant.location.city : cityQuery}</h2>
                {
                    appState.loading === true ?
                        <div>Fetching restaurants data...</div>
                        :
                        appState.restaurants?.length === 0 ?
                            <div>Restaurants not found</div>
                            :
                            (
                                appState.restaurants?.map(({ restaurant }, idx) => (
                                    <Card restaurantData={restaurant} key={idx} />
                                ))
                            )
                }
            </main>

        </>
    );
};

export default App;