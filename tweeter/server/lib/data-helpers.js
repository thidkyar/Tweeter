"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const { ObjectId } = require("mongodb");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      // simulateDelay() => {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    likeTweet: function(id, callback) {
      db.collection("tweets").updateOne({ _id: ObjectId(id) }, { $inc: { likes: 1 } });
      callback(null, true);
    },

    getTweets: function(callback) {
      db
        .collection("tweets")
        .find()
        .toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
    }
  };
};
