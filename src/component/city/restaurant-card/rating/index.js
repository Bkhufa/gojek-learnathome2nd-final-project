import React from 'react';
import Chip from '@material-ui/core/Chip';

import styles from '../card.module.css'

const Rating = ({ rating, className }) => {
    const ratings = Math.round(rating);
    const ratingArr = [...Array(ratings)];
    return (
        <>
            <Chip 
                variant="outlined"
                color="secondary"
                className={className}
                label={
                    ratingArr.map((_, idx) => (
                        <span key={idx} className={styles.goldenColor}>&#9733;</span>
                    ))
                } 
            />
            {/* <span>{rating}</span> */}
        </>
    );
};

export default Rating;