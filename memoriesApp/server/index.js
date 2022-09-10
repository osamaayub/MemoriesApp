import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import PostRoutes from './routes/posts.js';
import userRouter from './routes/users.js';


const app = express();

app.use('/posts', PostRoutes);
app.use('/users', userRouter);

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());



const CONNECTION_URL = 'mongodb+srv://usama4385:Cricket35@cluster0.diqgiby.mongodb.net/test';
const PORT = process.env.PORT || 5000;



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));


// mongoose.set("useFindAndModify", false);
