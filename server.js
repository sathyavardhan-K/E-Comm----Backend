const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userApi = require('./api/userApi'); // Import your user API routes
const productApi = require('./api/productApi');
const cartApi = require('./api/cartApi');
const orderApi = require('./api/orderApi');
const categoryApi = require('./api/categoryApi');

const loginApi = require('./api/loginApi');
const logoutApi = require('./api/logoutApi');


const app = express();

app.use(cors());


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.use(cookieParser());


const dbURI = process.env.MONGODB_URI; // Use the environment variable

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// .then(() => console.log('MongoDB connected successfully'))
.then(async () => {
    console.log('Connected to MongoDB');

  })
.catch(err => console.error('MongoDB connection error:', err));



// Use the user API routes
app.use('/api', userApi);
app.use('/api', productApi);
app.use('/api', cartApi);
app.use('/api', orderApi);
app.use('/api', categoryApi);

app.use('/api', loginApi);
app.use('/api', logoutApi);




// Start the server on port 3000 (or any port you prefer)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
