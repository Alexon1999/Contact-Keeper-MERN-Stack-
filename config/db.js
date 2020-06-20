const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// * Async await
const connectDB = async () => {
  // + mongoose return a promise
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);

    // + if there is an faillieure with connnection to DB
    process.exit(1);
  }
};

// * .then et catch
// const connectDB = () => {
//   // + mongoose return a promise
//   mongoose
//     .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => {
//       console.log(err.message);

//       // + if there is an faillieure with connnection to DB
//       process.exit(1);
//     });
// };

module.exports = connectDB;
