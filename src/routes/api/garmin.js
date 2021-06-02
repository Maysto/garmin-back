const express = require('express');
const Relative = require('../../model/Relative');
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
router.post('/Stress', (req, res) => {
    const id = "60a050e52371f40015f4bd69";
});