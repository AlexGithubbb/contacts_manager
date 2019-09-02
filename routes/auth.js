const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

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
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // gives us the array of errors
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: 'Invalid crendentials' });
      }
      // if user exist, continue to check the password using bcrypt
      // check if the password matches
      const isMatch = await bcrypt.compare(password, user.password); // also return a promise
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid crendentials' });
      }
      // send the token if all success
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        // sign a token
        payload,
        config.get('jwtSecret'), // "secret" from config
        {
          expiresIn: 360000 // not necessary to set
        },
        (err, token) => {
          if (err) throw Error;
          res.json({ token }); // send token to client
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
