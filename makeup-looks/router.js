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

// // return logged in username
// router.post('/returnusername', jwtAuth, (req, res) => {
//   res.send(req.user.username);
// })

router.post('/create', jwtAuth, (req, res) => {
  // take the incoming object and split the image file from the form data
  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(fields, files);
    console.log("files", files);
    let object;
    if (Object.keys(files).length > 0) {
      console.log("if files > 0");
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
        username: req.user.username,
        steps: fields.steps,
        products: fields.products,
        skintype: fields.skintype,
        colortheme: fields.colortheme
      };
    } else {
      object = {
        image: '/images/makeitup-logo-square.png',
        title: fields.title,
        username: req.user.username,
        steps: fields.steps,
        products: fields.products,
        skintype: fields.skintype,
        colortheme: fields.colortheme
      }
    }
    
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
  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log("fields:", fields);
    console.log("files", files);
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
        res.json(newLook.serialize())

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
