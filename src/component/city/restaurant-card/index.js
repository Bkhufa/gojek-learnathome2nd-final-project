import React from 'react';
import Rating from './rating';
import Budget from './budget';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

import styles from './card.module.css'

const RestaurantCard = ({ restaurantData }) => {
    const { picture, name, cuisines, priceRange, rating } = restaurantData;

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card className={styles.card}>
                    <CardMedia
                        className={styles.media}
                        image={!picture ? 'https://via.placeholder.com/300' : picture}
                        title="Restaurant Card"
                    />

                    <CardContent>
                        <h3 className={styles.header}>{name}</h3>
                        <div>
                            { cuisines && <Chip className={styles.chip} color="secondary" label={cuisines} clickable /> }

                            <div>
                                { rating && <Rating className={styles.chip} rating={rating} /> }
                                { priceRange && <Budget className={styles.chip} budget={priceRange} /> }
                            </div>
                        </div>
                    </CardContent>

                </Card>
            </Grid>
        </>
    );
};

export default RestaurantCard;