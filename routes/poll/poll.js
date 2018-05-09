const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Answer = require('../../models/Answer');

const Pusher = require('pusher');

const keys = require('../../config/keys');

var pusher = new Pusher({appId: keys.pusherAppId, key: keys.pusherKey, secret: keys.pusherSecret, cluster: keys.pusherCluster, encrypted: keys.pusherEncrypted});

router.get('/', (req, res) => {
  Answer
    .find()
    .then(answers => res.json({success: true, answers: answers}));
});

router.post('/', (req, res) => {
  const newAnswer = {
    os: req.body.answer,
    points: 1
  };

  new Answer(newAnswer)
    .save()
    .then(vote => {
      pusher.trigger('answer-poll', 'answer-vote', {
        points: parseInt(vote.points),
        answer: vote.answer
      });
      return res.json({success: true, message: 'Answer Submitted'});
    });
});

module.exports = router;
