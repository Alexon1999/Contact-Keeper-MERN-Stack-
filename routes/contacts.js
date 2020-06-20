const express = require('express');
const router = express.Router();

// CRUD Route
// Based on the user

// * @route | Get | api/users
// * @desc  | Get all users contacts
// * @access | Private
router.get('/', (req, res) => {
  res.send('Get all contacts of the user');
});

// * @route | Post | api/users
// * @desc  | Add new contact
// * @access | Private
router.post('/', (req, res) => {
  res.send('Add new contact');
});

// * @route | PUT | api/users/:id
// * @desc  | Update contact
// * @access | Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// * @route | Delete | api/users/:id
// * @desc  | Delete contact
// * @access | Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
