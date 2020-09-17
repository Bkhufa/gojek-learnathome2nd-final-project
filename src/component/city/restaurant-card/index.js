import React from 'react';
import Rating from './rating';
import Budget from './budget';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});

const RestaurantCard = ({ restaurantData }) => {
    const { featured_image, name, cuisines, price_range, user_rating } = restaurantData;
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                <Card className={classes.root}>
                    <CardMedia
                        // style={{ height: 0, paddingTop: '56%' }}
                        className={classes.media}
                        image={!featured_image ? 'https://via.placeholder.com/300' : featured_image}
                        title="Restaurant Card"
                    />

                    <CardContent>
                        <h1>{name}</h1>
                        <span>{cuisines}</span>
                        <Budget budget={price_range} />
                        <Rating rating={user_rating.aggregate_rating} />
                    </CardContent>

                </Card>
            </Grid>
        </>
    );
};

export default RestaurantCard;