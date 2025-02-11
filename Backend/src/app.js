const express = require('express');
const errorLogger = require('./utilities/errorLogger');
const authRouter = require('./routes/authRoutes');
const candidateRouter = require('./routes/candidateRoutes');
const employerRouter = require('./routes/employerRoutes');
const mongoose = require('mongoose');
const authService=require("./services/authService")
const http = require('http');
const cors = require('cors');
const { log } = require('console');
const app = express();
app.use(cors());
// ok
console.log("yha aaya");
app.use(express.json());

app.use((req,res,next)=>{
    console.log("Request is on path: ", req.path);
    console.log("Request is on method: ", req.method);
    next();
})
app.use(express.json())
// app.use(checking)



// Add this at the top of your app.js
const url = "mongodb://localhost:27017/jobNestDB";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


const messageSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});


const corsOptions = {
    origin: 'http://localhost:50146', // Allow only this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  };
  
// app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use("/api", authRouter);

app.use('/api/candidate', candidateRouter);
app.use('/api/employer', employerRouter);


app.use(errorLogger);

app.listen(3000, () => {
    console.log("server started");
})