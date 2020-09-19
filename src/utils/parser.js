export const parseCitySuggestions = data =>
  data.location_suggestions.map(e => {
    const { id, name } = e;
    return { id, name };
  });

export const parseSearchRestaurants = data =>
  data.restaurants.map(e => {
    const {
      id,
      name,
      thumb: picture,
      cuisines,
      price_range: priceRange,
      user_rating: { aggregate_rating: rating },
      location: { city } 
    } = e.restaurant;
    return { id, name, picture, cuisines, priceRange, rating, city };
  });

// OLD

// const restaurantStateHandle = (cityId) => {
//   setAppState({ loading: true })
//   fetchRestaurant(cityId).then(({ data }) => {
//       setAppState({ loading: false, restaurants: data.restaurants });
//       setCollapsible(false);
//       setCityQuery(data.restaurants[0].restaurant.location.city);
//   });
//   console.log(appState.restaurants);
// };

// const cityStateHandle = debounce((cityQuery) => {
//   fetchCity(cityQuery).then(({ data: { location_suggestions } }) => {
//       setCitySuggestion(location_suggestions);
//   });
// }, 500);