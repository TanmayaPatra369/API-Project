const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app.js');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Successfully connected to the DB :)'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('App successfully running on port ' + port);
});
