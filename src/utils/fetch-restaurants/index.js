import axios from 'axios';

const URL = 'https://developers.zomato.com/api/v2.1/';
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchFromSearch = (cityQuery) => (
    axios.get(URL, {
        params: {
            q: !cityQuery ? 'Jakarta' : cityQuery,
            count: 5,
            start: 2,
        },
        headers: {
            'user-key': API_KEY,
        }
    })
);

export const fetchCity = (cityQuery) => (
    axios.get(URL + '/cities', {
        params: {
            q: cityQuery,
        },
        headers: {
            'user-key': API_KEY,
        }
    })
);

export const fetchFromCity = (cityId) => (
    axios.get(URL + '/search', {
        params: {
            entity_id: cityId,
            entity_type: 'city',
            count: 5,
            start: 0,
        },
        headers: {
            'user-key': API_KEY,
        }
    })
);