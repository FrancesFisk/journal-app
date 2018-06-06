'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {MakeupLook} = require('./models');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const jwtAuth = passport.authenticate('jwt', {session: false});


router.get('/', (req, res) => {
  MakeupLook
    .find()
    // documents, and that's too much to process/return
    .then(makeupLooks => {
      res.json({
        makeupLooks: makeupLooks.map(
          (makeupLooks) => makeupLooks.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// For testing
// router.post('/create', (req, res) => {
//   let object = {
//     image: req.body.image,
//     title: req.body.title,
//     username: req.body.username,
//     steps: req.body.steps,
//     products: req.body.products,
//     skintype: req.body.skintype,
//     colortheme: req.body.colortheme
//   };
router.post('/create', jwtAuth, (req, res) => {
    let object = {
      image: req.body.image,
      title: req.body.title,
      username: req.user.username,
      steps: req.body.steps,
      products: req.body.products,
      skintype: req.body.skintype,
      colortheme: req.body.colortheme
    };
    return MakeupLook  
      .create(object)
      .then(newLook => {
        res.json(newLook.serialize());
      })
      .catch(error => {
        res.send(sendError);
      })
})

router.delete('/:id', (req, res) => {
  MakeupLook
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: "Delete was successful"});
    })
    .catch(err => {
      res.status(500).json({message: "Internal server error"});
    }
  )
})


module.exports = {router};
