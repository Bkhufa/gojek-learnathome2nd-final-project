import React, { useEffect, useState } from 'react';
import { fetchFromCity, fetchCity } from '../../utils/fetch-restaurants'

const Card = ({ restaurantData }) => {
    const { featured_image, name, cuisines, price_range, user_rating } = restaurantData;
    return (
        <>
            <div className='card'>
                <img src={!featured_image ? 'https://via.placeholder.com/300' : featured_image} alt='restaurant card' />
                <h1>{name}</h1>
                <span>{cuisines}</span>
                <Budget budget={price_range} />
                <Rating rating={user_rating} />
            </div>
        </>
    );
};

const Budget = ({ budget }) => {
    const budgets = [...Array(budget)];
    return (
        budgets.map((_, idx) => (
            <span key={idx}>$</span>
        ))
    );
};

const Rating = ({ rating }) => {
    const ratings = [...Array(rating)];
    return (
        ratings.map((_, idx) => (
            <span key={idx}>&#9733;</span>
        ))
    );
};

const CitySuggestion = ({ cityData }) => {
    const { id, name } = cityData;
    return (
        <div>
            <span>{name}</span>
            <span>{id}</span>
        </div>
    )
}

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
        fetchFromCity(cityList[0].id).then(({ data }) => {
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
                    if(cityList.length > 0){
                        fetchFromCity(cityList[0].id).then(({ data }) => {
                            setAppState({ loading: false, restaurants: data.restaurants });
                            setCityQuery(cityList[0].name);
                        });
                    }
                }}>Change City</button>

                <div>
                    {   cityList.length === 0 ?
                            <div>City Not Found</div>
                            :
                            cityList.map((cities, idx) => (
                                <CitySuggestion cityData={cities} key={idx} onClick={() => {
                                    console.log('clicked');
                                    fetchFromCity(cities.id).then(({ data }) => {
                                        setAppState({ loading: false, restaurants: data.restaurants });
                                    });
                                }}/>
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