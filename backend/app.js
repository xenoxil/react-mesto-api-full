const express = require('express');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { loginValidation } = require('./middlewares/validation');
const { errorHandler } = require('./middlewares/errorHandler');
const { createUser, login, logout } = require('./controllers/users');
const ResourceUnavalableError = require('./errors/ResourceUnavailableError');

const { PORT = 3001 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
});

app.use(cors({
  origin: 'http://localhost:3006',
  credentials: true,
}));
app.use(limiter);
app.use(helmet());
app.use(cookies());

app.use(express.json());
app.use(requestLogger);
app.post('/signin', loginValidation, login);
app.post('/signup', loginValidation, createUser);
app.delete('/', logout);
app.use('/', router);
app.use('*', (req, res, next) => {
  next(new ResourceUnavalableError('Запрашиваемый ресурс не найден'));
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('App listening on port:', PORT);
});