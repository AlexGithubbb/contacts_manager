const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
// better to build the signature for a preview

// you'll want to make sure that you validate the input and report any errors before creating the user:

// @route   POST api/users
// @desc    Regiser a user
// @access  Public
router.post(
  '/',
  [
    // username must be an email
    check('name', 'Please add a name')
      .not()
      .isEmpty(), // check for name, not empty
    check('email', 'Please include a valid email').isEmail(),
    // password must be at least 5 chars long
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // gives us the array of errors
    }
    // res.send('passed '); // for error test using postman
    // req.body should have all the info we post, (name, email, pswd, date), in order to get those info,
    // we need to destructure it
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already existed' });
      }
      user = new User({
        name,
        email,
        password
      });
      // 10 is default value to generate a salt value
      const salt = await bcrypt.genSalt(10);
      // hash the plain text password with salt
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // with the id, we can access all the contacts that user has
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
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('server error...');
    }
  }
);

module.exports = router;
