import React, { useEffect, useState } from 'react';

const restaurants = [
    {
        name    : 'Pizzahut',
        cuisine : 'Italian Dish',
        budget  : 4,
        rating  : 3,
    },
    {
        name    : 'McD',
        cuisine : 'American Dish',
        budget  : 2,
        rating  : 1,
    },
    {
        name    : 'Wargre',
        cuisine : 'Gresik Dish',
        budget  : 1,
        rating  : 5,
    },
];

const Header = () => {
    const [cityQuery, setCityQuery] = useState('Cirebon');

    return (
        <>
            <header>
                <h1>Go Zomato</h1>
                <input type='text' placeholder='Search City' value={cityQuery}
                    onChange={({ target: { value } }) => {
                        setCityQuery(value);
                    }}
                />
                <button onClick={() => {
                    // TODO: Fetch Zomato API
                }}>Change City</button>
            </header>
        </>
    );
};

const Card = ({ img, name, cuisine, budget, rating }) => {
    return (
        <>
            <div className='card'>
                <img src={img} alt='restaurant card' />
                <h1>{name}</h1>
                <span>{cuisine}</span>
                <Budget budget={budget} />
                <Rating rating={rating} />
            </div>
        </>
    );
};

const Budget = ({ budget }) => {
    const budgets = [...Array(budget)];
    return (
        budgets.map(() => (
            <span>$</span>
        ))
    );
};

const Rating = ({ rating }) => {
    const ratings = [...Array(rating)];
    return (
        ratings.map(() => (
            <span>&#9733;</span>
        ))
    );
};

const Main = () => {
    return (
        <>
            <Header />
            {
                restaurants.map(({ name, cuisine, budget, rating }, idx) => (
                    <Card img={'https://via.placeholder.com/300'} name={ name } cuisine={ cuisine } budget={ budget } rating={ rating } key={idx} />
                ))
            }
        </>
    );
};

export default Main;