// const searchRestaurantsFromCity = async () => {
//     try {
//       const cities = parseCitySuggestions(await fetchCity(cityQuery));
//       setCitySuggestion(cities);

//       if (cities.length > 0) {
//         const restaurants = parseSearchRestaurants(
//           await fetchRestaurant(cities[0].id)
//         );
//         setAppState({ restaurants: restaurants });
//       }
//     } catch (error) {
//     //   setError(error.message);
//       console.error(error.message);
//     }
//   };

//   searchRestaurantsFromCity();