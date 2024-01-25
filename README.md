# Front end repository for my blog sharing social media website using Vite/React

# Link to deployed site: https://blog-list-app-backend.fly.dev

A website for sharing, exploring and engaging with various blog posts from around the internet. Users can create an account, log in, and like/comment on blog posts. Authentication is done using JSON web tokens. For full in-depth details on how this was done, refer to the back-end repository: https://github.com/AlenMandic/fullstack-blog-app-backend

This project was made with the intention of having a website to save and browse other curated unique blog posts from around the internet. When searching for interesting blog posts via google you will only find entire blogs, and finding unique and interesting individual blog posts can be very hard.

- `Material UI` was used to style the website.

- `Axios` was used to handle services/requests. --> `/src/services/`

- `React Router` was used to separate the website into relevant pages to enable full link sharing and a better user experience

- Pagination system and a sorting system was implemented

# Testing

- End to end tests have been implemented using Cypress and can be found in the `/cypress/e2e` folder

- Basic front end testing was started using `Jest`

- Basic linting has been implemented using `ESlint`

# Main folder `/src`

- Components have been separated into regular components and full Material UI components.
- Some regular components import a styled MUI component while only handling the logic.
- The `services` folder contains all the logic for talking to our back-end and database, and also an automatic logout detector which logs the user out if they are inactive for 1 hour.
- `utils.js` exports commonly re-used functions across the project
- Main logic, functions, and routing is found in the main component `App.jsx`
- App will show various error, success or info notifications to the user depending on the status of their operations on the website.
- Handling of unknown or incorrect routes has been implemented using React Router

# Asynchronous state managament
- We control and synchronize state with an external system ( our MongoDB database ) using my own written custom hooks to handle fetching data, loading and error states, found in `/src/custom-hooks`

- Once the first testing phase was done, a production ready `dist` folder was created by using Vite's build  `npm run build` command, ready to be used in our back-end repository.
