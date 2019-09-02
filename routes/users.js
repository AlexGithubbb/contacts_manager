const express = require('express');
const router = express.Router();

// better to build the signature for a preview

// @route   POST api/users
// @desc    Regiser a user
// @access  Public
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
