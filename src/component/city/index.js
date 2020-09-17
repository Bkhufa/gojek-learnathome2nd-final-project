import React, { useEffect, useState } from 'react';
import { fetchRestaurant, fetchCity } from '../../utils/fetch-api';
import RestaurantCard from './restaurant-card';
import CitySuggestion from './city-suggestion';

import { IconButton } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    suggestion: {
        
    },
});


const Main = () => {
    const [cityQuery, setCityQuery] = useState('Jakarta');
    const [cityList, setCityList] = useState([{
        id: 74,
        name: 'Jakarta'
    }]);
    const [appState, setAppState] = useState({
        loading: false,
        restaurants: null,
    });
    const [collapsibleState, setCollapsible] = useState(false)

    const classes = useStyles();

    const restaurantStateHandle = (cityId) => {
        fetchRestaurant(cityId).then(({ data }) => {
            setAppState({ loading: false, restaurants: data.restaurants });
            setCollapsible(false);
        });
    };

    const cityStateHandle = (cityQuery) => {
        fetchCity(cityQuery).then(({ data: { location_suggestions } }) => {
            setCityList(location_suggestions);
        });
    };

    useEffect(() => {
        setAppState({ loading: true });
        restaurantStateHandle(cityList[0].id);
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <header>
                    <h1>Go Zomato</h1>
                    <div>
                        <OutlinedInput
                            value={cityQuery}
                            fullWidth
                            placeholder="Search City"
                            type="search"
                            margin="dense"
                            onChange={({ target: { value } }) => {
                                setCityQuery(value);
                                cityStateHandle(cityQuery);
                                setCollapsible(true);
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
                        <Collapse
                            className={classes.suggestion}
                            timeout='auto'
                            in={collapsibleState}
                        >
                            <List>
                                {cityList.length === 0 ?
                                    <ListItem>City Not Found</ListItem>
                                    :
                                    cityList.map((cities, idx) => (
                                        <CitySuggestion cityData={cities} key={idx} onClickHandler={restaurantStateHandle} />
                                    ))
                                }
                            </List>
                        </Collapse>
                    </div>
                </header>

                <main>
                    <h2>Displaying restaurants in {appState.restaurants ? appState.restaurants[0].restaurant.location.city : cityQuery}</h2>
                    <Grid alignContent='center' container spacing={3}>
                        {
                            appState.loading === true ?
                                <Grid item xs={12}>Fetching restaurants data...</Grid>
                                :
                                appState.restaurants?.length === 0 ?
                                    <Grid item xs={12}>Restaurants not found</Grid>
                                    :
                                    (
                                        appState.restaurants?.map(({ restaurant }, idx) => (
                                            <RestaurantCard restaurantData={restaurant} key={idx} />
                                        ))
                                    )
                        }
                    </Grid>
                </main>
            </Container>
        </>
    );
};

export default Main;