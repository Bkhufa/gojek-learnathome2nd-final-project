# Go Zomato

Go Zomato is a web app to help you find restaurants based on the city you input. Developed with React and Zomato API

Try it yourself on: https://gozomato.netlify.app

## Application Flow

1. User type city search query in the search bar
2. The app will show you the city suggestion from Zomato City API endpoint. The API is triggered with debounce every 500ms when the user stop writing
3. User can click the city suggestion or the search button
   * If the user clicked the search button, the app will automatically search the restaurants in the first city suggestion.
   * If the user clicked the city suggestion, the app will search the restaurants in that city.
4. After a little bit of loading, all the restaurants are displayed at the lower part of the page.

## Get Started

To try the project yourself you can run:

### `npm install`

Install all the dependencies needed for running this project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
