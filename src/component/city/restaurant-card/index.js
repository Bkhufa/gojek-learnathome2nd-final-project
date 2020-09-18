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
    const { featured_image, name, cuisines, price_range, user_rating } = restaurantData;

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card className={styles.card}>
                    <CardMedia
                        // style={{ height: 0, paddingTop: '56%' }}
                        className={styles.media}
                        image={!featured_image ? 'https://via.placeholder.com/300' : featured_image}
                        title="Restaurant Card"
                    />

                    <CardContent>
                        <h3 className={styles.header}>{name}</h3>
                        <div>
                            {
                                cuisines ?
                                    <Chip className={styles.chip} color="secondary" label={cuisines} clickable />
                                    :
                                    <div></div>
                                }

                            <div>
                                {
                                    price_range ?
                                    <Budget className={styles.chip} budget={price_range} />
                                    :
                                    <div></div>
                                }
                                {
                                    user_rating.aggregate_rating ?
                                    <Rating className={styles.chip} rating={user_rating.aggregate_rating} />
                                    :
                                    <div></div>
                                }
                            </div>
                        </div>
                    </CardContent>

                </Card>
            </Grid>
        </>
    );
};

export default RestaurantCard;