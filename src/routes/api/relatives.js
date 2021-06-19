const express = require('express');
const { ObjectId } = require('bson');
const Doctor = require('../../model/Doctor');
const Crypto = require("../../config/Sha1Encode");
const router = express.Router();
const Relative = require("../../model/Relative");
const User = require("../../model/User");
const pack = require("locutus/php/misc/pack");
const btoa = require('btoa');
const fetch = require("node-fetch");
const { route } = require("./users");
const Event = require('../../model/Event');

let makeid = function (length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

/**
 * @route POST api/relatives/addOne
 * @desc Create a relative and associate hin to the user that made the relative's profile
 * @access Public
 */
router.post('/addOne', (req, res) => {

  const target = { email: userEmail };

  newRelative = new Relative({
    firstname,
    lastname,
    age,
    gender,
    height,
    weight,
  });

  User.findOne(target).then((res) => {
    res.relatives.push(newRelative);
    res.save();
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
        color
    } = req.body;

    const query = { "relatives": { $elemMatch: { _id: ObjectId(relativeId) } } };

    const newEvent = new Event({
        nameEvent,
        startEvent,
        endEvent,
        color
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

  const target = { _id: _id };

  Relative.findOne(target)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          relative: result,
          msg: "Found the relative : " + result._id,
        });
      } else {
        console.log("No document matches the provided query.");
      }
    })
    .catch((err) => console.error(`Failed to find document: ${err}`));
});

/**
 * @route GET api/relatives/
 * @desc return a relative researched by ID
 * @access Public
 */



router.get("/confirmRequest", async (req, res) => {

  console.log("requête reçue");
  
  let requestOptions = {
    method: "POST",
    Accept: "application/text",
  };

  let currentURL =
    "https://connectapi.garmin.com/oauth-service/oauth/request_token?";
  let oauth_consumer_key = "50658631-7f95-428e-995a-1d4a84f81255";
  let oauth_consumer_secret = "qs6QrMQtQW0W2nOo08ipzlL9sZwupmRJyjF";
  let oauth_nonce = makeid(15);
  let oauth_timestamp = Math.round(Date.now() / 1000);
  let baseString =
    "POST&" +
    encodeURIComponent(
      "https://connectapi.garmin.com/oauth-service/oauth/request_token"
    ) +
    "&" +
    encodeURIComponent(
      "oauth_consumer_key=" +
        oauth_consumer_key +
        "&oauth_nonce=" +
        oauth_nonce +
        "&oauth_signature_method=HMAC-SHA1" +
        "&oauth_timestamp=" +
        oauth_timestamp +
        "&oauth_version=1.0"
    );
  let oauth_signature_base = Crypto.sha1_hmac(
    baseString,
    oauth_consumer_secret + "&"
  );
  let oauth_signature = encodeURIComponent(
    btoa(pack("H*", oauth_signature_base))
  );
  console.log('Avant requête');

  fetch(
    currentURL +
      "oauth_consumer_key=" +
      oauth_consumer_key +
      "&oauth_nonce=" +
      oauth_nonce +
      "&oauth_signature_method=HMAC-SHA1" +
      "&oauth_timestamp=" +
      oauth_timestamp +
      "&oauth_version=1.0" +
      "&oauth_signature=" +
      oauth_signature,
    requestOptions
  )
    .then((response) => console.log(response.status))
    .then((response) => console.log(response.text()));
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