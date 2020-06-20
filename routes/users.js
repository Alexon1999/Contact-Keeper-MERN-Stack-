const express = require('express');
const router = express.Router();
// + middleware for check request body(email , name , password)
// express validator : npm i express-validator
const { check, validationResult } = require('express-validator');

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
    res.json(req.body);
  }
);

module.exports = router;
