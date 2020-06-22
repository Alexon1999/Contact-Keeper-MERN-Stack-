const express = require('express');
const router = express.Router();
// + middleware for check request body(email , name , password)
// express validator : npm i express-validator
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// * @route | POST | api/users
// * @desc  | Register a user
// * @access | Public
router.post(
  '/',
  [
    check('name', 'Please put a name').not().isEmpty(),
    check('email', 'Please include a valide email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req); // give an array

    //*  !errors.errors.length
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  },
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // email : email

      // findOne : give an object (the finded document)
      // + check if user already in database
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //+ si mongodb trouve pas le email alors le user sera null

      user = new User({
        name,
        email,
        password,
      });

      // +encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      console.log(user.password);
      console.log(user); // give an object like this
      // {
      //   _id: 5eee637089c0770c242455cf,
      //   name: 'test',
      //   email: 'test@gmail.com',
      //   date: 2020-06-20T19:28:48.803Z,
      //   password: '$2a$10$ZeD465infO9y3fqaUvM.BONAxLOyrHeCJj9MLIPyRkEMwY9rjBDbG'
      // }

      await user.save();

      // + data that we want to send
      const payload = {
        user: {
          id: user.id,
        },
      };

      // 3600 : 1hour ,
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
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
