const express = require('express');
const router = express.Router();

// * @route | Get | api/auth
// * @desc  | Get logged in user
// * @access | Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// authentification / log in and we send data

// * @route | Post | api/auth
// * @desc  | Auth user and get tokken
// * @access | Public
router.post('/', (req, res) => {
  res.send('log in user');
});

module.exports = router;
