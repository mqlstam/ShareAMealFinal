// index.js

require('dotenv').config();

const errorMiddleware = require('./middleware/error');


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const mealRoutes = require('./routes/meal.routes');
const infoRoutes = require('./routes/info.routes');
const responseFormatter = require('./middleware/responseFormatter');


app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', mealRoutes);
app.use('/api', infoRoutes);


app.get('/', (req, res) => {
  res.send('Share-a-Meal API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(responseFormatter);

app.use(express.json());
app.use(errorMiddleware);


