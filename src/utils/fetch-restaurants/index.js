import axios from 'axios';

const url = 'https://developers.zomato.com/api/v2.1/search';
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchFromCity = (cityQuery) => (
    axios.get(url, {
        params: {
            q: !cityQuery ? 'Jakarta' : cityQuery,
            count: 5,
            start: 2,
        },
        headers: {
            'user-key': API_KEY,
        }
    })
) 