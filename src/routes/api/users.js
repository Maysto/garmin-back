const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret
const passport = require('passport');
const User = require('../../model/User');
const Relative = require('../../model/Relative');

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
        password,
    } = req.body

    let premium = false;
    let premiumDate = null;

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
        password,
        premium,
        premiumDate
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
    User.findOne({ email: req.body.email }).then(user => {
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
 * @route POST api/users/deleteRelative
 * @desc Update the user's relative
 * @access Public
 */
router.post('/deleteRelative', async(req, res) => {

    let {
        email,
        id
    } = req.body;

    try {

        const query = { "email": email }
        const updatedUser = await User.findOne(query);

        updatedUser.relatives.forEach(element => {
            if (element._id == id) {
                updatedUser.relatives.splice(updatedUser.relatives.indexOf(element), 1);
            }
        });

        await User.updateOne(query, { $set: { "relatives": updatedUser.relatives } }).then(() => {
            return res.status(200).json({
                success: true,
            })
        })

    } catch (error) {
        console.log(error);
    }
});


/**
 * @route POST api/users/updateRelative
 * @desc Update the user's relative
 * @access Public
 */
router.post('/updateRelative', async(req, res) => {

    let {
        email,
        id
    } = req.body;

    try {

        const deletedRelative = await Relative.findOne({ "_id": id });

        await User.findOne({ "email": email }).then(user => {

            user.relatives.push(deletedRelative);
            return user.save();
        });

    } catch (error) {
        console.log(error);
    }
    res.send({
        success: true,
    });
});

/**
 * @route POST api/users/updatePremium
 * @desc Update the user's premium status
 * @access Public
 */
router.post('/updatePremium', passport.authenticate('jwt', { session: false }), async(req, res) => {
    let {
        premium,
        premiumDate,
        email
    } = req.body;

    try {

        const user = await User.findOne({ "email": email }).then(user => {
            user.premium = premium;
            user.premiumDate = premiumDate;
            user.save();
        });
        res.send(user);

    } catch (error) {
        console.log(error);
    }
});

/**
 * @route GET api/users/dashboard
 * @desc Return the User's dashboard
 * @access Authentified users
 */
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    })
});


/**
 * @route GET api/users/getAll
 * @access Public
 */

router.get('/getAll', async(req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log(error)
    }
});

/**
 * @route GET api/users/:email
 * @access Public
 */

router.get('/:email', async(req, res) => {
    const { email } = req.params;

    const user = await User.findOne({ "email": email });
    console.log(user)
    res.send(user)
});

module.exports = router;