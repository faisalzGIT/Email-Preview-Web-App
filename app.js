require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connectionm
let conn = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/emails', emailRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('authBtnPage');
});



app.get('/all', (req, res) => {
  res.send("All emails here");
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
