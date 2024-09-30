import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'

// npm run dev

// create app object/instance of express application
// instance of imported module that provdies methods for middleware
// middleware: bridge between os/database and application
const app = express();

app.use(express.json());

// creates new http route
// http route: function that runs when a url is visited
// respond with 'new user joined' when a GET request is made to homepage
app.get('/', (request, response) => {
    // console.log(request)
    console.log('new user joined')
    return response.status(234).send('Welcome to my world');
});

// Route for Update a Book
// Async functions return promises
// promises 
app.put('/books/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        // await pauses the async function until the method call returns
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route for Save a new Book
// multiple async functions can run at once
// await pauses execution and allows other tasks to run
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        // must make a return statement
        // sends response to Express app
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Book from database
app.get('/books/:id', async (request, response) => {
    try {

        const { id } = request.params;

        // wait pauses function execution until fetch rquest completes
        const book = await Book.findById(id);

        // .json() sends items inside parenthesis to client
        return response.status(200).json(book); 
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete an existing book
app.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Look for book in database and delete
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

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