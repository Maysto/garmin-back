const { ObjectId } = require('bson');
const express = require('express');
const Relative = require('../../model/Relative');
const User = require('../../model/User');
const router = express.Router();

/**
 * @route POST api/garmin/Activites
 * @desc Endpoint for garmin to post the activities of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Activities', async(req, res) => {
    const id = "60c0bfd88e0e920015206acb";
    let activityData = req.body;
    const query = { "relatives": { $elemMatch: { _id: ObjectId(id) } } };


    await Relative.findOne({ "_id": id }).then(rel => {
        rel.activities.push(activityData);
        rel.save();
    });

    try {
        await User.updateMany(query, { $push: { "relatives.$[elem].activities": activityData } }, { arrayFilters: [{ "elem._id": { $eq: ObjectId(id) } }] }).then(() => {
            return res.status(200).json({
                success: true,
            })
        });


    } catch (error) {
        console.error(error);
    }
});

/**
 * @route POST api/garmin/Dailies
 * @desc Endpoint for garmin to post the dailies data of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Dailies', async(req, res) => {
    const id = "60c0bfd88e0e920015206acb";
    let dailiesData = req.body;
    const query = { "relatives": { $elemMatch: { _id: ObjectId(id) } } };


    await Relative.findOne({ "_id": id }).then(rel => {
        rel.dailies.push(dailiesData);
        rel.save();
    });

    try {
        await User.updateMany(query, { $push: { "relatives.$[elem].dailies": dailiesData } }, { arrayFilters: [{ "elem._id": { $eq: ObjectId(id) } }] }).then(() => {
            return res.status(200).json({
                success: true,
            })
        });


    } catch (error) {
        console.error(error);
    }
});

/**
 * @route POST api/garmin/Sleep
 * @desc Endpoint for garmin to post the sleep data of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Sleep', async(req, res) => {
    const id = "60c0bfd88e0e920015206acb";
    let sleepData = req.body;
    const query = { "relatives": { $elemMatch: { _id: ObjectId(id) } } };


    await Relative.findOne({ "_id": id }).then(rel => {
        rel.sleep.push(sleepData);
        rel.save();
    });

    try {
        await User.updateMany(query, { $push: { "relatives.$[elem].sleep": sleepData } }, { arrayFilters: [{ "elem._id": { $eq: ObjectId(id) } }] }).then(() => {
            return res.status(200).json({
                success: true,
            })
        });


    } catch (error) {
        console.error(error);
    }
});

/**
 * @route POST api/garmin/Stress
 * @desc Endpoint for garmin to post the stress data of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Stress', async(req, res) => {
    const id = "60c0bfd88e0e920015206acb";
    let stressData = req.body;
    const query = { "relatives": { $elemMatch: { _id: ObjectId(id) } } };


    await Relative.findOne({ "_id": id }).then(rel => {
        rel.stress.push(stressData);
        rel.save();
    });

    try {
        await User.updateMany(query, { $push: { "relatives.$[elem].stress": stressData } }, { arrayFilters: [{ "elem._id": { $eq: ObjectId(id) } }] }).then(() => {
            return res.status(200).json({
                success: true,
            })
        });


    } catch (error) {
        console.error(error);
    }
});

module.exports = router;