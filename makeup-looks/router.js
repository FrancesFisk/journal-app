'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {MakeupLook} = require('./models');
const formidable = require('formidable'); 
const fs = require('fs');

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
  // take the incoming object and split the image file from the form data
  // files refers to uploads
  // fields refers to the input
  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(fields, files);
    let oldpath = files['0'].path; 
    let newpath = './public/images/' + files['0'].name;
    let imageUrl = `/images/${files['0'].name}`;
    fs.rename(oldpath, newpath, function(error) {
      // keep this?
      if(error) {
        throw error
      }
    })
    let object = {
      image: imageUrl,
      title: fields.title,
      username: req.user.username,
      steps: fields.steps,
      products: fields.products,
      skintype: fields.skintype,
      colortheme: fields.colortheme
    };
    return MakeupLook  
      .create(object)
      .then(newLook => {
        res.json(newLook.serialize());
      })
      .catch(error => {
        res.send(error);
      })
    console.log(req.body);
  })
})

router.put('/:id', (req, res) => {
  MakeupLook.update({
    id: req.params.id,
    title: req.body.title,
    steps: req.body.steps,
    products: req.body.products,
    skintype: req.body.skintype,
    colortheme: req.body.colortheme
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
