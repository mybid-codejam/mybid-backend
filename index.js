require('dotenv').config(); // register .env
const express = require('express');
const firebase = require('firebase-admin');
const Route = require('./routes/route');
const serviceAccount = require('./mybid-e8958-firebase-adminsdk-tke8g-b70beafbeb.json');

const port = process.env.PORT || 3000;
const app = express();

// *init firebase
const firebaseConfig = {
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: 'mybid-e8958.appspot.com',
};
firebase.initializeApp(firebaseConfig);

// *init module
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// *init route
app.use('/api', new Route().init());

app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
