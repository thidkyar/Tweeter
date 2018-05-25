"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const likesRoutes   = express.Router();

module.exports = function(DataHelpers) {
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

//

  // tweetsRoutes.post("/likes", function(req, res) {
  //   DataHelpers.likeTweet('5b082fdec21f9c3158ec80e0', (err) => {
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.status(201).send();
  //     }
  //   });
  // });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text,
        likes: 0
      },
      created_at: new Date()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}

tweetsRoutes.post('/tweets/', (req, res) => {

})
