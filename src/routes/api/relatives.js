const express = require('express');
const router = express.Router();
const Relative = require('../../model/Relative');

/**
 * @route POST api/relatives/addOne
 * @desc Create a relative and associate hin to the user that made the relative's profile
 * @access Public
 */
 router.post('/addOne', (req, res) => {

});

module.exports = router;