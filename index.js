require('dotenv').config(); // register .env
const express = require('express');
const bodyParser = require('body-parser');
const Route = require('./routes/route');

const port = 3000;
const app = express();

// *init module
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// *init route
app.use('/api', new Route().init());

// *handle not found
// eslint-disable-next-line arrow-body-style
app.use('*', (req, res) => {
  return res.status(400).json({
    success: false,
    message: 'Endpoint not found',
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
