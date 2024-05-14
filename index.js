// index.js
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import mealRoutes from './routes/meal.routes.js';
import infoRoutes from './routes/info.routes.js';
import responseFormatter from './middleware/responseFormatter.js';
import errorMiddleware from './middleware/error.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(responseFormatter);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', mealRoutes);
app.use('/api', infoRoutes);
app.get('/', (req, res) => {
  res.send('Share-a-Meal API is running!');
});
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
