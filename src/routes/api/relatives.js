const express = require('express');
const router = express.Router();
const Relative = require('../../model/Relative');

/**
 * @route POST api/relatives/addOne
 * @desc Create a relative and associate hin to the user that made the relative's profile
 * @access Public
*/
router.post('/addOne', (req, res) => {

    let {
        firstname,
        lastname,
        age,
        gender,
        height,
        weight
    } = req.body


    newRelative = new Relative({
        firstname,
        lastname,
        age,
        gender,
        height,
        weight
    });

    newRelative.save().then(relative => {
        return res.status(201).json({
            succes: true,
            msg: "Relative created"
        })
    })
});

module.exports = router;