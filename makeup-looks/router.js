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

// return logged in username
router.post('/returnusername', jwtAuth, (req, res) => {
  res.send(req.user.username);
})

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

router.put('/update', jwtAuth, (req, res) => {
  // take the incoming object and split the image file from the form data
  // files refers to uploads
  // fields refers to the input
  let form = new formidable.IncomingForm();
  // make sure none of 89-97 hits if there are no files
  // adjust 101-108, if it doesn't have anything in it, don't want that image url to exist

  form.parse(req, function(err, fields, files) {
    console.log(fields, files);
    let object;
    if (Object.keys(files).length > 0) {
      let oldpath = files['0'].path; 
      let newpath = './public/images/' + files['0'].name;
      let imageUrl = `/images/${files['0'].name}`;
      fs.rename(oldpath, newpath, function(error) {
        // keep this?
        if(error) {
          throw error
        }
      })
      object = {
        image: imageUrl,
        title: fields.title,
        steps: fields.steps,
        products: fields.products,
        skintype: fields.skintype,
        colortheme: fields.colortheme
      };  
    } else {
      object = {
        title: fields.title,
        steps: fields.steps,
        products: fields.products,
        skintype: fields.skintype,
        colortheme: fields.colortheme
      };  
    }
    return MakeupLook  
      .findByIdAndUpdate(fields.id, object, {new: true})
      .then(newLook => {
        res.json(newLook.serialize());
      })
      .catch(error => {
        res.send(error);
      })
    console.log(req.body);
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
