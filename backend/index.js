import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

// npm run dev

// create app object/instance of express application
// instance of imported module that provdies methods for middleware
// middleware: bridge between os/database and application
const app = express();

// Middleware for handling CORS Policy
// Option 1: Allow All Origins with Default of cors(*)
// Allows everything

// Option 2: Allow Custom Origins
// Specifiy which websites it accepts data from

// CORS defines a way for web apps to interact with resources in different domains
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Middleware for parsing reqeust body
// Accepts data in json format
// app.use(express.json());

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