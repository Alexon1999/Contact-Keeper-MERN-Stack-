const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const auth = require('../middleware/auth');

// * @route | Get | api/auth
// * @desc  | Get logged in user
// * @access | Private
router.get('/', auth, async (req, res) => {
  try {
    // find by id : give an object , if its found
    const user = await User.findById(req.user.id).select('-password'); //find user with no password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// authentification / log in and we send data

// * @route | Post | api/auth
// * @desc  | Auth user and get tokken
// * @access | Public
router.post(
  '/',
  [
    check('email', 'Please inclue a valide Email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // give an array

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // email : email

      //+ if there no user with this email ,  DB give us null
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // + give a boolean
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // + data that we want to send
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
