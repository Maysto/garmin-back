const express = require('express');
const { ObjectId } = require('bson');
const Doctor = require('../../model/Doctor');
const router = express.Router();
const Relative = require('../../model/Relative');
const User = require('../../model/User');
const Event = require('../../model/Event');

/**
 * @route POST api/relatives/addOne
 * @desc Create a relative and associate hin to the user that made the relative's profile
 * @access Public
 */
router.post('/addOne', (req, res) => {

    let {
        userEmail,
        firstname,
        lastname,
        age,
        gender,
        height,
        weight,
    } = req.body

    const target = { "email": userEmail }

    newRelative = new Relative({
        firstname,
        lastname,
        age,
        gender,
        height,
        weight,
    });

    User.findOne(target).then(res => {
        res.relatives.push(newRelative);
        res.save();
    })

    newRelative.save().then(relative => {

        return res.status(201).json({
            succes: true,
            relativeID: relative._id, // Send back the id to update the user's relatives list.
            msg: "Relative with the id : " + relative._id + " created"
        });
    });

});

/**
 * @route POST api/relatives/addDoctor
 * @desc add a Doctor associated to a relative
 * @access Public
 */
router.post('/addDoctor', async(req, res) => {

    let {
        relativeId,
        firstname,
        lastname,
        specialities,
        phone
    } = req.body;

    const query = { "relatives": { $elemMatch: { _id: ObjectId(relativeId) } } };

    const newDoctor = new Doctor({
        firstname,
        lastname,
        phone,
        specialities
    });

    try {
        await User.updateOne(query, { $push: { "relatives.$[elem].doctors": newDoctor } }, { arrayFilters: [{ "elem._id": { $eq: ObjectId(relativeId) } }] }).then(() => {
            res.status(200).json({
                success: true,
            });
        });
    } catch (error) {
        console.error(error)
    }

});

/**
 * @route POST api/relatives/addEvent
 * @desc add an Event associated to a relative's calendar
 * @access Public
 */
router.post('/addEvent', async(req, res) => {

    let {
        relativeId,
        nameEvent,
        startEvent,
        endEvent,
        color,
        timed
    } = req.body;

    const query = { "relatives": { $elemMatch: { _id: ObjectId(relativeId) } } };

    const newEvent = new Event({
        nameEvent,
        startEvent,
        endEvent,
        color,
        timed
    });

    try {
        await User.updateOne(query, { $push: { "relatives.$[elem].events": newEvent } }, { arrayFilters: [{ "elem._id": { $eq: ObjectId(relativeId) } }] }).then(() => {
            res.status(200).json({
                success: true,
            });
        });
    } catch (error) {
        console.error(error)
    }

});

/**
 * @route GET api/relatives/getOne
 * @desc return a relative researched by ID
 * @access Public
 */
router.get('/getOne', (req, res) => {

    let _id = req.body;

    const target = { "_id": _id }

    Relative.findOne(target).then(result => {
        if (result) {
            return res.status(200).json({
                success: true,
                relative: result,
                msg: "Found the relative : " + result._id
            });
        } else {
            console.log("No document matches the provided query.");
        }
    }).catch(err => console.error(`Failed to find document: ${err}`));

});


/**
 * @route GET api/relatives/
 * @desc return a relative researched by ID
 * @access Public
 */

router.get('/', async(req, res) => {

    try {
        const list = await Relative.find();
        res.send(list)
    } catch (error) {
        res.send(error)
    }

});


/**
 * @route GET api/relatives/
 * @desc return a relative researched by ID
 * @access Public
 */

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    const relative = await Relative.findOne({ "_id": id });
    console.log(relative)
    res.send(relative)
});




module.exports = router;