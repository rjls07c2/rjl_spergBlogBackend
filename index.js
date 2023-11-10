require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const { errorHandler } = require('./middleware/errorMiddleware');

mongoose.connect(mongoString);
const database = mongoose.connection;

// database.on('error', (error)=>{
//     console.log(error);
// })

database.once('connected', ()=>{
    console.log('Database Connected');
})

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// app.use('/api', require('./routes/routes'));
app.use("/api/posts", require('./routes/postsRoutes'));
app.use("/api/users", require('./routes/usersRoutes'));

app.use(errorHandler);

app.listen(4200, ()=>{
    console.log(`Server Listening on Port ${4200}`)
})