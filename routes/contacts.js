const express = require('express');
const router = express.Router();

// better to build the signature for a preview

// @route   GET api/contacts
// @desc    get all contacts for single user
// @access  Private
router.get('/', (req, res) => {
  res.send('get contacts info ');
});

// @route   POST api/contacts
// @desc    contacts User and get token
// @access  Private
router.post('/', (req, res) => {
  res.send('add new contact');
});

// @route   PUT api/contacts/:id
// @desc    Update the contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update the contact');
});

// @route   DELTETE api/contacts:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete the contact');
});

module.exports = router;
