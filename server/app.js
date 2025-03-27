const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const todosRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Helmet to protect HTTP headers
app.use(helmet());

// Cookie parser
app.use(cookieParser());

// Habilitar CORS para todas las rutas
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // Permitir cookies y encabezados de autenticación
  })
);

// Body parser
app.use(bodyParser.json());

app.use(express.json({ limit: '10kb' })); // Controls the maximum request body size
app.use(express.urlencoded({ extended: true, limit: '10kb' })); //  Encoded the url

app.use('/api/v1/todos', todosRoutes);
app.use('/api/v1/users', userRoutes);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); // Si le pasamos algo al next, este asumirá q es un error y lo mandará directamente al middleware que maneja los errores
// });

module.exports = app;
