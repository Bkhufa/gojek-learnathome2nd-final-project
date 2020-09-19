import axios from 'axios';

const URL = 'https://developers.zomato.com/api/v2.1/';
const API_KEY = process.env.REACT_APP_API_KEY;

export const getCity = (cityQuery) => (
    axios.get(URL + '/cities', {
        params: {
            q: cityQuery,
        },
        headers: {
            'user-key': API_KEY,
        }
    })
);

export const getRestaurant = (cityId) => (
    axios.get(URL + '/search', {
        params: {
            entity_id: cityId,
            entity_type: 'city',
        },
        headers: {
            'user-key': API_KEY,
        }
    })
);