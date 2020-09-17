import React, { useEffect, useState } from 'react';
import { fetchRestaurant, fetchCity } from '../../utils/fetch-api';
import Card from './restaurant-card';
import CitySuggestion from './city-suggestion';

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

    useEffect(() => {
        setAppState({ loading: true });
        fetchRestaurant(cityList[0].id).then(({ data }) => {
            setAppState({ loading: false, restaurants: data.restaurants })
        });
    }, [setAppState]);

    return (
        <>
            <header>
                <h1>Go Zomato</h1>
                <input type='search' placeholder='Search City' value={cityQuery}
                    onChange={({ target: { value } }) => {
                        setCityQuery(value);
                        fetchCity(cityQuery).then(({ data: { location_suggestions } }) => {
                            setCityList(location_suggestions);
                        });
                    }}
                />
                <button onClick={() => {
                    if (cityList.length > 0) {
                        fetchRestaurant(cityList[0].id).then(({ data }) => {
                            setAppState({ loading: false, restaurants: data.restaurants });
                            setCityQuery(cityList[0].name);
                            console.log(appState.restaurants);
                        });
                    }
                }}>Change City</button>
                <div>
                    {cityList.length === 0 ?
                        <div>City Not Found</div>
                        :
                        cityList.map((cities, idx) => (
                            <CitySuggestion cityData={cities} key={idx} onClick={() => {
                                console.log('clicked');
                                fetchRestaurant(cities.id).then(({ data }) => {
                                    setAppState({ loading: false, restaurants: data.restaurants });
                                });
                            }} />
                        ))
                    }
                </div>
            </header>

            <main>
                <h2>Displaying restaurants in {cityQuery}</h2>
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