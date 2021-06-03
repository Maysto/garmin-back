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
router.post('/Activities', (req, res) => {

});

/**
 * @route POST api/garmin/ActivityDetail
 * @desc Endpoint for garmin to post the activity details of a relavtive
 * @access Public
 * @todo 
 */
router.post('/ActivityDetail', (req, res) => {

});

/**
 * @route POST api/garmin/Dailies
 * @desc Endpoint for garmin to post the dailies data of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Dailies', (req, res) => {

});

/**
 * @route POST api/garmin/Sleep
 * @desc Endpoint for garmin to post the sleep data of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Sleep', (req, res) => {

});

/**
 * @route POST api/garmin/Stress
 * @desc Endpoint for garmin to post the stress data of a relavtive
 * @access Public
 * @todo 
 */
router.post('/Stress', async(req, res) => {
    const id = "60b81259bc85490015c30a27"; //des datas pour karim
    let stressData = req.body;

    await Relative.findOne({ "_id": id }).then(rel => {
        rel.stress.push(stressData);
        rel.save();
    });

    await User.find({ "relatives": { $elemMatch: { _id: ObjectId(id) } } }).then(list => {
        list.forEach(async(user) => {
            user.relatives.forEach(rel => {
                if (rel._id == id) {
                    rel.stress.push(stressData);
                }
            });
            const promise = await user.save();
            console.log(promise);
        })
    });

    return res.status(200).json({
        success: true,
    });
});

module.exports = router;