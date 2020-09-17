import React from 'react';
import Rating from './rating';
import Budget from './budget';

const Card = ({ restaurantData }) => {
    const { featured_image, name, cuisines, price_range, user_rating } = restaurantData;
    return (
        <>
            <div className='card'>
                <img src={!featured_image ? 'https://via.placeholder.com/300' : featured_image} alt='restaurant card' />
                <h1>{name}</h1>
                <span>{cuisines}</span>
                <Budget budget={price_range} />
                <Rating rating={user_rating.aggregate_rating} />
            </div>
        </>
    );
};

export default Card;