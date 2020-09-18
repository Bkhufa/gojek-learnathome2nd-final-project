import React, { useEffect, useState } from 'react';
import { fetchRestaurant, fetchCity } from '../../utils/fetch-api';
import RestaurantCard from './restaurant-card';
import CitySuggestion from './city-suggestion';
import SearchButton from './search-button';
import styles from './styles.module.css';

import { Container, InputAdornment, OutlinedInput, List, ListItem, Collapse, Grid, CircularProgress } from '@material-ui/core';
// import Container from '@material-ui/core/Container';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Collapse from '@material-ui/core/Collapse';
// import Grid from '@material-ui/core/Grid';

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

    const restaurantStateHandle = (cityId) => {
        setAppState({ loading:true })
        fetchRestaurant(cityId).then(({ data }) => {
            setAppState({ loading: false, restaurants: data.restaurants });
            setCollapsible(false);
            setCityQuery(data.restaurants[0].restaurant.location.city);
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
        <div onClick={() => {setCollapsible(false)}}>
            <header className={styles.header}>
                <h1 className={styles.textCenter}>Go Zomato</h1>
                <Container maxWidth="lg" className={styles.positionRelative}>
                    <OutlinedInput
                        value={cityQuery}
                        fullWidth
                        placeholder="Search City"
                        type="search"
                        margin="dense"
                        className={styles.backgroundWhite}
                        onChange={({ target: { value } }) => {
                            setCityQuery(value);
                            cityStateHandle(cityQuery);
                            setCollapsible(true);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchButton cityList={cityList} onclickHandler={restaurantStateHandle} />
                            </InputAdornment>
                        }
                    />
                    <Collapse
                        className={styles.citySuggestion}
                        timeout='auto'
                        in={collapsibleState}
                    >
                        <List>
                            {cityList.length === 0 ?
                                <ListItem className={styles.textBlack}>City Not Found</ListItem>
                                :
                                cityList.map((cities, idx) => (
                                    <CitySuggestion cityData={cities} key={idx} onClickHandler={restaurantStateHandle} />
                                ))
                            }
                        </List>
                    </Collapse>
                </Container>
            </header>

            <Container maxWidth="lg">
                <main>
                    <h2 className={styles.textCenter}>Displaying restaurants in {appState.restaurants ? appState.restaurants[0].restaurant.location.city : cityQuery}</h2>
                    <Grid alignContent='center' container spacing={3}>
                        {
                            appState.loading === true ?
                                <Grid item xs={12} className={styles.textCenter}>
                                    <p>
                                        Fetching restaurants data...
                                    </p>
                                    <CircularProgress />
                                </Grid>
                                :
                                appState.restaurants?.length === 0 ?
                                    <Grid item xs={12} className={styles.textCenter}>Restaurants not found</Grid>
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
        </div>
    );
};

export default Main;