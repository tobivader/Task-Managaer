
const express = require('express');
const app = express();
const task =  require('./routes/task');
const connectDB  = require( './db/connect');
require('dotenv').config();


// middle ware 
app.use(express.static('./public'))
app.use(express.json())

//routes 

app.use('/api/v1/tasks', task);
const port = 5500;

const start = async () => {
     try {
          await connectDB(process.env.MONGO_URI)
          app.listen(port, console.log(`Server is Listening on port ${port}....`));
     } catch (error) {
          console.log(error);
     }
};

start();