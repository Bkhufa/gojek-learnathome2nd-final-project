import React, { useEffect, useState } from 'react';
import { fetchFromCity } from '../../utils/fetch-restaurants'

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

// const Main = ({ restaurantCity }) => {

//     console.log("Main Changed");
//     return (
//         <div>
//             {
//                 restaurantCity?.map(({ restaurant: { name, cuisines, price_range, user_rating } }, idx) => (
//                     <Card img={'https://via.placeholder.com/300'} name={name} cuisine={cuisines} budget={price_range} rating={Math.floor(user_rating.aggregate_rating)} key={idx} />
//                 ))
//             }
//         </div>
//     );
// };

const App = () => {
    const [cityQuery, setCityQuery] = useState('Jakarta');
    const [appState, setAppState] = useState({
        loading: false,
        restaurants: null,
    });
    console.log(appState.restaurants);

    useEffect((cityQuery) => {
        setAppState({ loading: true });
        fetchFromCity(cityQuery).then(({ data }) => {
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
                    }}
                />
                <button onClick={() => {
                    fetchFromCity(cityQuery).then(({ data }) => {
                        setAppState({ loading: false, restaurants: data.restaurants });
                    });
                }}>Change City</button>
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