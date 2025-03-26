const express  = require('express')
const bodyParser = require('body-parser')
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes");
const tagRoutes = require("./routes/tagRoutes");


//Create object of express
const app = express();

//middleware
app.use(bodyParser.json());

app.use("/profiles", profileRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes); 
app.use("/tags", tagRoutes);

module.exports = app;