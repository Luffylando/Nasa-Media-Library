# Nasa Library Front End Project

Instructions for starting the project:

1. Download/clone repo to your local machine.
2. Install all dependencies by running: `npm install`
3. Create .env file and add one variable: VITE_API_URL=https://images-api.nasa.gov

Im providing value here since it's an open API, else, I would send it secretly.

4. Now you can start application by running: `npm run dev`

There you can browse trough nasa library and see some specific results of the search.

5. You can check basic tests written in cypress by running: `npm run cypress`

From the cypress console just click on the tests.

Additional info: for cypress make sure your application is running on the same port as the one defined in cypress.config.ts (baseUrl property).


