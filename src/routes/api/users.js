const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret
const passport = require('passport');
const User = require('../../model/User');

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
    let {
        firstname,
        lastname,
        email,
        password
    } = req.body

    console.log(req.body);

    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email already associated to an account."
            });
        }
    });

    // Creation of the new user
    let newUser = new User({
        firstname,
        lastname,
        email,
        password
    });

    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User registered"
                });
            });
        });
    });
});

/**
 * @route POST api/users/login
 * @desc Signing the User
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({ email : req.body.email}).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Email is not found",
                success: false
            });
        }
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // Password is matching so we need to send the JSON Token for that user 
                const payload = {
                    _id: user._id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: 'You are logged in.'
                    });
                });
            } else {
                return res.status(404).json({
                    msg: "Incorrect password",
                    success: false
                })
            }
        })
    });
});

/**
 * @route POST api/users/dashboard
 * @desc Return the User's dashboard
 * @access Public
 */
router.get('/dashboard',passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    })
});

module.exports = router;