const express = require('express');
const router = express.Router();

// better to build the signature for a preview

// @route   GET api/auth
// @desc    get loggedin user
// @access  Private
router.get('/', (req, res) => {
  res.send('get loggedin user');
});

// @route   POST api/auth
// @desc    Auth User & Get token
// @access  Public
router.post('/', (req, res) => {
  res.send('Log in User');
});

module.exports = router;
