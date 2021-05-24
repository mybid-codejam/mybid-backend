require('dotenv').config();
const express = require('express');
const Route = require('./routes/route');

const port = 3000;
const app = express();

// init route
app.use('/api', new Route().init());

app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
