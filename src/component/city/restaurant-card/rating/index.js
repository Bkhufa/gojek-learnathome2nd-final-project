import React from 'react';
import Chip from '@material-ui/core/Chip';

import styles from '../card.module.css'

const Rating = ({ rating, className }) => {
    const roundedRating = Math.round(rating);
    const ratingArr = [...Array(roundedRating)];

    const ratingStar = () => (
        ratingArr.map((_, idx) => (
            <span key={idx} className={styles.goldenColor}>&#9733;</span>
        ))
    );

    return (
        <>
            {
                rating ?
                    <Chip 
                        icon={<span className={styles.ratingAvatar}>{rating}</span>}
                        variant="outlined"
                        color="secondary"
                        className={className}
                        label={ratingStar()} 
                    />
                    :
                <div></div>
            }
        </>
    );
};

export default Rating;