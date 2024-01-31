const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected successfully to MongoDB server'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

require('./Passport');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', authRoutes);
app.use('/users', userRoutes);

// APi end point http://localhost:3000/users/saveBirthdate
// {
//   "firstName": "abc",
//   "birthdate": "06-06-2549"
// }

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

function isLoggedIn(req, res, next) {
  console.log(req.user);
  req.user ? next() : res.sendStatus(401);
}
