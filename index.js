require('dotenv').config(); // register .env
const express = require('express');
const cors = require('cors');
const firebase = require('firebase-admin');
const Route = require('./routes/route');

const port = process.env.PORT || 3000;
const app = express();

// *init firebase
const firebaseConfig = {
  credential: firebase.credential.cert(`./${process.env.FIREBASE_PATH}`),
  storageBucket: process.env.FIREBASE_BUCKET,
};
firebase.initializeApp(firebaseConfig);

// *init module
// cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// *init route
app.use('/api', new Route().init());

app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
