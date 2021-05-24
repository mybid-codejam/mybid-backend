import express from 'express';
import Route from './routes/route';

const port = 3000;
const app = express();

// init route
app.use('/api', new Route().init());

app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
