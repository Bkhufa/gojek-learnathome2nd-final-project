import React, { useEffect, useState } from 'react';
import { fetchFromCity, fetchCity } from '../../utils/fetch-restaurants'

const Card = ({ restaurantData: { featured_image, name, cuisines, price_range, user_rating } }) => {
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

const CitySuggestion = ({ data: { id, name } }) => {
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
        cityId: 74,
        cityName: 'Jakarta'
    }]);
    // const [cityList, setCityList] = useState([{}]);
    const [appState, setAppState] = useState({
        loading: false,
        restaurants: null,
    });
    // console.log(appState.restaurants);

    useEffect(() => {
        setAppState({ loading: true });

        fetchFromCity(cityList[0].cityId).then(({ data }) => {
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
                            console.log("suggestion", location_suggestions);
                            setCityList(location_suggestions);
                        });
                    }}
                />
                <button onClick={() => {
                    fetchFromCity(cityList[0].id).then(({ data }) => {
                        setAppState({ loading: false, restaurants: data.restaurants });
                        console.log(cityList);
                    });
                }}>Change City</button>

                {
                    // console.log("cityList", cityList)
                    cityList.map((data, idx) => (
                        <CitySuggestion data={data} key={idx} onClick={() => {
                            console.log('clicked');
                            fetchFromCity(data.cityId).then(({ data }) => {
                                setAppState({ loading: false, restaurants: data.restaurants });
                            });
                        }}/>
                    ))
                }

            </header>

            <main>
                {
                    appState.loading === true ?
                        <div>Fetching restaurants data...</div>
                        :
                        // {/* <Main restaurantCity={appState.restaurants} /> */ }
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