const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// CRUD Route
// Based on the user

// * @route | Get | api/contacts
// * @desc  | Get all users contacts
// * @access | Private
router.get('/', auth, async (req, res) => {
  // ? req.user.id : string

  try {
    // sort : recent contact created
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    // find : give an array , if there is no contacts with the user  give an empty array

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('ServerError');
  }
});

// * @route | Post | api/contacts
// * @desc  | Add new contact
// * @access | Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req); // give an array

    // 400 : Bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      //  + c'est un object
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// * @route | PUT | api/contacts/:id
// * @desc  | Update contact
// * @access | Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // + Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not Found' });
    }

    console.log(contact);
    // Make sure user owns contact
    // 401 : unauthorized
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorised' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );

    res.json(contact); // updated contact
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// * @route | Delete | api/contacts/:id
// * @desc  | Delete contact
// * @access | Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not Found' });
    }
    // Make sure user owns contact
    // + if in contact user id is not the actual client req.user.id
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorised' });
    }

    // use remove not delete
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
