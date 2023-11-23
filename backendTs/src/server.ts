import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
//import connectDb from "./config/db";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
dotenv.config();

import mongoose, { mongo } from "mongoose";

//var mongoose = require("mongoose");
const URL: string | undefined = process.env.MONGO_URL;

// Add Mongoose connection to Express.js
mongoose.connect(
    // Set up the connection to your database.  
    'mongodb://localhost:27017/blogcrud01',
     
     
      {} , // not longer neccesary
       //useUnifiedTopology: true } // not longer neccesary
      );
    //mongoose.set("useCreateIndex", true); // not longer neccesary
    // Assign the database to the db variable.
    const db = mongoose.connection;
    
    // Log a message when the application connects to the database.
    db.once("open", () => {
      console.log("Successfully connected to MongoDB using Mongoose!");
    });



const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());
//connectDb();

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
