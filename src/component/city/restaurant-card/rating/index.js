import React from 'react';

const Rating = ({ rating }) => {
    const ratings = Math.round(rating);
    const ratingArr = [...Array(ratings)];
    return (
        <>
            {
                ratingArr.map((_, idx) => (
                    <span key={idx}>&#9733;</span>
                ))
            }
            <span>{rating}</span>
        </>
    );
};

export default Rating;