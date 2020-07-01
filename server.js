const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

// + Connect Database
connectDB();

// + Init Midddleware
app.use(express.json()); // parse json
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.json({ msg: ' Welcome to my first project with Mern stack' });
// });

// + Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// + Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // ? set static folder
  app.use(express.static('client/build'));

  //+ anything that not routes
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(require('./middleware/404notFound'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
