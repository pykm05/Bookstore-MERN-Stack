import mongoose from "mongoose";

// Mongoose document: wrapper of schema, provides interface to database for creating, querying, ect.
// Mongoose schema: defines the sturcture of document
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema)