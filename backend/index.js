import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';

// npm run dev

// create app object/instance of express application
// instance of imported module that provdies methods for middleware
// middleware: bridge between os/database and application
const app = express();

// Book requests are rerouted to 
app.use('./books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');

        // create new server instance and start listening to incoming requests
        app.listen(PORT, () => {
        console.log('App is listening to port: ' + PORT)
});
    })
    .catch((error) => {
        console.log(error)
    });