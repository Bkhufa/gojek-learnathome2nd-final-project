import React, { useEffect, useState } from 'react';
import { getRestaurant, getCity } from '../../utils/api';
import { parseCitySuggestions, parseSearchRestaurants } from '../../utils/parser';
import { debounce } from '../../utils/debounce';

// Importing Components
import RestaurantCard from './restaurant-card';
import CitySuggestion from './city-suggestion';
import SearchButton from './search-button';
import styles from './styles.module.css';

// Importing UI Library
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Main = () => {
    const [collapsibleState, setCollapsible] = useState(false)
    const [error, setError] = useState()
    const [cityQuery, setCityQuery] = useState('Jakarta');

    const [citySuggestion, setCitySuggestion] = useState([{
        id: 74,
        name: 'Jakarta'
    }]);
    const [appState, setAppState] = useState({
        loading: false,
        restaurants: null,
    });

    const restaurantStateHandle = (cityId) => {
        setAppState({ loading: true })
        getRestaurant(cityId).then(({ data }) => {
            const restaurants = parseSearchRestaurants(data);
            setAppState({ loading: false, restaurants: restaurants });
            setCityQuery(restaurants[0].city);
        });
        setCollapsible(false);
    };

    const cityStateHandle = debounce((cityQuery) => {
        getCity(cityQuery).then(({ data }) => {
            const cityList = parseCitySuggestions(data);
            setCitySuggestion(cityList);
        });
        setCollapsible(true);
    }, 500);

    useEffect(() => {
        setAppState({ loading: true });
        const searchRestaurantsFromCity = () => {
            try {
                restaurantStateHandle(74);
            } catch (error) {
                setError(error.message);
            }
        };
        searchRestaurantsFromCity();
    }, []);

    return (
        <div onClick={() => { setCollapsible(false) }}>
            <header className={styles.header}>
                <h1 className={styles.headerText}>Go Zomato</h1>
                <Container maxWidth="md" className={styles.positionRelative}>
                    <OutlinedInput
                        value={cityQuery}
                        fullWidth
                        placeholder="Search City"
                        type="search"
                        margin="dense"
                        className={styles.backgroundWhite}
                        onChange={({ target: { value } }) => {
                            setCityQuery(value);
                            cityStateHandle(value);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchButton citySuggestion={citySuggestion} onclickHandler={restaurantStateHandle} />
                            </InputAdornment>
                        }
                    />
                    <Collapse
                        className={styles.citySuggestion}
                        timeout='auto'
                        in={collapsibleState}
                    >
                        <List>
                            {citySuggestion.length === 0 ?
                                <ListItem className={styles.textBlack}>City Not Found</ListItem>
                                :
                                citySuggestion.map((data, idx) => (
                                    <CitySuggestion cityData={data} key={idx} onClickHandler={restaurantStateHandle} />
                                ))
                            }
                        </List>
                    </Collapse>
                </Container>
            </header>

            <Container maxWidth="lg" >
                <main>
                    {error && <div className={styles.textCenter}>Error: {error}</div>}
                    <h2 className={styles.textCenter}>Displaying restaurants in {appState.restaurants && appState.restaurants[0].city}</h2>
                    <Grid alignItems="center" justify="center" container spacing={4}>
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
                                        appState.restaurants?.map((data, idx) => (
                                            <RestaurantCard restaurantData={data} key={idx} />
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