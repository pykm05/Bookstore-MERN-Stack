import express from "express";
import { PORT } from "./config.js"

// create app object/instance of express application
// instance of imported module that provdies methods for middleware
// middleware: bridge between os/database and application
const app = express();

// creates new http route
// http route: function that runs when a url is visited
// respond with 'welcome to my world' when a GET request is made to homepage
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to my world');
});

// create new server instance and start listening to incoming requests
app.listen(PORT, () => {
    console.log('App is listening to port: ' + PORT)
});