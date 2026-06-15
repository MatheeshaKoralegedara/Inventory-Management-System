const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');    
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.log(err));
