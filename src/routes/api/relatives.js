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
            relativeID: relative._id,                            // send back the id to update the user's relatives list.
            msg: "Relative with the id : " + relative._id + "created"
        })
    })
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

router.get('/', async (req, res) => {

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

router.get('/:id', async (req, res) => {
    const {id} = req.params;
  
    const relative = await Relative.findOne({"_id":id});
    res.send(relative)
});



module.exports = router;