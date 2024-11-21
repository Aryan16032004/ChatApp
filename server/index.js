const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute.js');
const chatRoute = require('./Routes/chatRoute.js');
const messageRoute = require('./Routes/messageRoute.js');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)

app.post

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

app.listen(port, (req,res) => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(uri)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Error: ', err);
});