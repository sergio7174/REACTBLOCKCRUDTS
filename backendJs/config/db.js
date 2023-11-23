const
mongoose = require("mongoose");

module.exports = {

 connectDb : () => {

const URL = process.env.MONGO_URL;
// Add Mongoose connection to Express.js
mongoose.connect(
    // Set up the connection to your database.  
    URL,
    
     
      {// useNewUrlParser: true , // not longer neccesary
        // useFindAndModify: false } // not longer neccesary
      });
    //mongoose.set("useCreateIndex", true); // not longer neccesary
    // Assign the database to the db variable.
    const db = mongoose.connection;
    
    // Log a message when the application connects to the database.
    db.once("open", () => {
      console.log("Successfully connected to MongoDB using Mongoose!");
    });
}}