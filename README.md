# Front end repository for my blog sharing social media website using Vite/React

# Link to deployed site: https://blog-list-app-backend.fly.dev

- A website for sharing, exploring and liking various blog posts from around the internet. Users can create an account, log in, and like/post blog posts. Authentication is done using JSON web tokens. For full in-depth details on how this was done, refer to the back-end repository: https://github.com/AlenMandic/fullstack-blog-app-backend

- `Material UI` was used to style the website.

- `Axios` was used to handle services/requests. --> `/src/services/`

- `React Router` was used to separate the website into relevant pages to enable link sharing and a better user experience

- Full Pagination system and a sorting implemented for the `Front Page` component/page.

# Testing

- Basic front end testing was started using `Jest`

- End to end tests have been implemented using Cypress and can be found in the `/cypress/e2e` folder

- Basic linting has been implemented using `ESlint`

# Main folder `/src`

- Components have been separated into regular components and full Material UI components.
- Some regular components import a styled MUI component while only handling the logic.
- The `services` folder contains all the logic for talking to our back-end and database, and also an automatic logout detector which logs the user out if they are inactive for 1 hour.
- Main logic, functions, and routing is found in the main component `App.jsx`
- App will show various error, success or info notifications to the user depending on the status of their operations on the website.
- Handling of unknown or incorrect routes has been implemented using React Router

- Once the first testing phase was done, a production ready `dist` folder was created by using Vite's build  `npm run build` command, ready to be used in our back-end repository.
