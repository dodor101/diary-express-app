// database connection
const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://duckenson21:camille1@bestapp.iav2lem.mongodb.net/?retryWrites=true&w=majority`;

// Wrap Mongoose around local connection to MongoDB
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("You are connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Export connection
module.exports = mongoose.connection;
