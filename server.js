require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');
const addressRoutes = require('./routes/addresses');
const searchRoutes = require('./routes/search');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/search', searchRoutes);


const PORT = process.env.PORT || 5000;
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server listening on', PORT));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
