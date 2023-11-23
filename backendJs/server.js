"use strict";

const 
// require express module
express = require("express"),
mongoose = require("mongoose"),
// The express webserver application is instantiated and stored
// in a constant to be referred to as app
app = express(),
cors = require("cors"),
dotenv = require("dotenv"),
//connectDb = require("./config/db"),
userRoutes = require("./routes/userRoutes"),
postRoutes = require( "./routes/postRoutes");
dotenv.config();


const URL = process.env.MONGO_URL;
// Add Mongoose connection to Express.js
mongoose.connect(
    // Set up the connection to your database.  
    //"mongodb://localhost:27017/blogcrud01",
    URL,
     
      {useNewUrlParser: true} , // not longer neccesary
       //useUnifiedTopology: true } // not longer neccesary
      );
    //mongoose.set("useCreateIndex", true); // not longer neccesary
    // Assign the database to the db variable.
    const db = mongoose.connection;
    
    // Log a message when the application connects to the database.
    db.once("open", () => {
      console.log("Successfully connected to MongoDB using Mongoose!");
    });

// set up the aplication to listen on port 3000
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.json());


app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });