import React from 'react';
import Chip from '@material-ui/core/Chip';

const Rating = ({ rating, className }) => {
    const ratings = Math.round(rating);
    const ratingArr = [...Array(ratings)];
    return (
        <>
            <Chip
                className={className}
                label={
                    ratingArr.map((_, idx) => (
                        <span key={idx}>&#9733;</span>
                    ))
                } 
            />
            {/* <span>{rating}</span> */}
        </>
    );
};

export default Rating;